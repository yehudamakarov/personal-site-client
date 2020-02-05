import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { dashboardTagsApi } from "../../../../../logic/dashboard/tags/tagsJobsApi";
import { ResultStatus } from "../../../../baseTypes/ResultStatus";
import { IApplicationState } from "../../../../rootReducer";
import {
    handleMapTagJobStatusUpdateAction,
    IMapTagLoadingAction,
    MAP_TAG_LOADING,
} from "../../../../signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../../signalR/init";
import { IMapTagJobStatusLookup, MapTagJobStatus } from "../../../../signalR/reducer";
import { SocketStatus } from "../../../../ui/uiReducer";
import { IFacade } from "../../../projects/ui/selectors";
import { FacadeIds } from "../../tagsTransferListReducer";
import { getTransferListFacadesLoadingAction } from "../tagsTransferListActions";

const facadeItemsFromIdsSelector = (facadeIds: FacadeIds) => (state: IApplicationState): IFacade[] => {
    const results: IFacade[] = [];
    for (const transferListFacadeId of facadeIds) {
        results.push(state.tagsTransferList.facadeItems[transferListFacadeId]);
    }
    return results;
};

export const mapTagJobSuccessfulSelector = (state: IApplicationState) => {
    const jobStage = state.jobStatus.mapTagStatus.jobStage;
    const socketStatus = state.ui.socketStatus;
    const facadesAreLoading = state.tagsTransferList.allIsLoading;
    return (
        (jobStage === JobStage.Done || jobStage === JobStage.None) &&
        socketStatus === SocketStatus.connected &&
        !facadesAreLoading
    );
};

export const mapTagInProgressSelector = (state: IApplicationState) => {
    const jobStage = state.jobStatus.mapTagStatus.jobStage;
    return jobStage !== JobStage.Done && jobStage !== JobStage.None && jobStage !== JobStage.Warning;
};

function getWarningStatus(tagId: string) {
    return {
        item: {
            data: { tagId },
            details: {
                message: "Something is taking a while.",
                resultStatus: ResultStatus.Warning,
            },
        },
        jobStage: JobStage.Warning,
    };
}

function getErrorStatus(tagId: string, errorInfo: string) {
    return {
        item: {
            data: { tagId },
            details: {
                message: errorInfo,
                resultStatus: ResultStatus.Failure,
            },
        },
        jobStage: JobStage.Error,
    };
}

function handleJobDone(status: IMapTagJobStatusLookup, dispatch: EnhancedStore["dispatch"]) {
    const currentTag = status.item;
    if (currentTag) {
        dispatch(getTransferListFacadesLoadingAction(currentTag.data.tagId));
    }
}

function* mapTag(action: IMapTagLoadingAction) {
    const tagId = action.payload;
    try {
        // =============================================================================== //
        // start job
        const facadeIdsToBeMapped: FacadeIds = yield select((state: IApplicationState) => state.tagsTransferList.left);
        const facadesToBeMapped: IFacade[] = yield select(facadeItemsFromIdsSelector(facadeIdsToBeMapped));
        const response: AxiosResponse<IMapTagJobStatusLookup> = yield call(
            dashboardTagsApi.mapTag,
            facadesToBeMapped,
            tagId,
        );
        yield put(handleMapTagJobStatusUpdateAction(response.data));
        // =============================================================================== //
        // warning timeout
        yield delay(10000);
        const jobIsStartableAgain = yield select(mapTagJobSuccessfulSelector);
        if (!jobIsStartableAgain) {
            yield put(handleMapTagJobStatusUpdateAction(getWarningStatus(tagId)));
        }
    } catch (error) {
        const errorInfo = JSON.stringify(error);
        yield put(handleMapTagJobStatusUpdateAction(getErrorStatus(tagId, errorInfo)));
    }
}

export const registerMapTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushMapTagJobStatusUpdate", (status: MapTagJobStatus) => {
        // =============================================================================== //
        // job update
        dispatch(handleMapTagJobStatusUpdateAction(status));
        // =============================================================================== //
        // job done
        if (status.jobStage === JobStage.Done) {
            handleJobDone(status, dispatch);
        }
    });
};

export function* watchMapTag() {
    yield takeEvery(MAP_TAG_LOADING, mapTag);
}
