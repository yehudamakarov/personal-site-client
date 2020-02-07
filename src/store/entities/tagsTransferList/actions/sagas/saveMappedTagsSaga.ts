import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { mapTagJobDoneAction } from "../../../../../logic/dashboard/tags/rename/actions";
import { JobButtonStatus, JobStates, jobSuccessfulSelector } from "../../../../../logic/dashboard/tags/rename/saga";
import { dashboardTagsApi } from "../../../../../logic/dashboard/tags/tagsJobsApi";
import { ResultStatus } from "../../../../baseTypes/ResultStatus";
import { IApplicationState } from "../../../../rootReducer";
import {
    handleMapTagJobStatusUpdateAction,
    IMapTagLoadingAction,
    MAP_TAG_LOADING,
} from "../../../../signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../../signalR/init";
import { MapTagJobStatus } from "../../../../signalR/reducer";
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

export const mapTagJobSuccessfulSelector = (key: string, statusSelector: (state: IApplicationState) => JobStates) => (
    state: IApplicationState,
): JobButtonStatus => {
    const facadesAreLoading = state.tagsTransferList.allIsLoading;
    if (facadesAreLoading) {
        return JobButtonStatus.InProgress;
    } else {
        return jobSuccessfulSelector(key, statusSelector)(state);
    }
};

function getWarningStatus(tagId: string): MapTagJobStatus {
    return {
        item: {
            data: { tagId },
            details: {
                message: "Something is taking a while.",
                resultStatus: ResultStatus.Warning,
            },
        },
        jobStage: JobStage.Warning,
        uniqueKey: tagId,
    };
}

function getErrorStatus(tagId: string, errorInfo: string): MapTagJobStatus {
    return {
        item: {
            data: { tagId },
            details: {
                message: errorInfo,
                resultStatus: ResultStatus.Failure,
            },
        },
        jobStage: JobStage.Error,
        uniqueKey: tagId,
    };
}

function handleJobDone(status: MapTagJobStatus, dispatch: EnhancedStore["dispatch"]) {
    dispatch(mapTagJobDoneAction(status));
    const currentTag = status.item;
    if (currentTag) {
        dispatch(getTransferListFacadesLoadingAction(currentTag.data.tagId));
    }
}

function* mapTag(action: IMapTagLoadingAction) {
    const tagId = action.payload;
    console.log("payload: ", tagId);
    try {
        // =============================================================================== //
        // start job
        const facadeIdsToBeMapped: FacadeIds = yield select((state: IApplicationState) => state.tagsTransferList.left);
        const facadesToBeMapped: IFacade[] = yield select(facadeItemsFromIdsSelector(facadeIdsToBeMapped));
        const response: AxiosResponse<MapTagJobStatus> = yield call(
            dashboardTagsApi.mapTag,
            tagId,
            facadesToBeMapped,
            tagId,
        );
        yield put(handleMapTagJobStatusUpdateAction(response.data));
        // =============================================================================== //
        // warning timeout
        yield delay(10000);

        const jobStatus: JobButtonStatus = yield select(
            mapTagJobSuccessfulSelector(tagId, (state) => state.jobStatus.mapTagStatus),
        );
        if (jobStatus === JobButtonStatus.InProgress) {
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
