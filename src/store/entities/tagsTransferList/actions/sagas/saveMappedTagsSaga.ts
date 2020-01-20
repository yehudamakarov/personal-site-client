import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";
import { ResultStatus } from "../../../../baseTypes/ResultStatus";
import { IApplicationState } from "../../../../rootReducer";
import {
    handleMapTagJobStatusUpdateAction,
    IMapTagLoadingAction,
    MAP_TAG_LOADING,
} from "../../../../signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../../signalR/init";
import { IMapTagJobStatus } from "../../../../signalR/reducer";
import { SocketStatus } from "../../../../ui/uiReducer";
import { IFacade } from "../../../projects/ui/selectors";
import { tagsTransferListApi } from "../../api";
import { FacadeIds } from "../../tagsTransferListReducer";
import { getTransferListFacadesLoadingAction } from "../tagsTransferListActions";

const facadeItemsFromIdsSelector = (facadeIds: FacadeIds) => (state: IApplicationState): IFacade[] => {
    const results: IFacade[] = [];
    for (const transferListFacadeId of facadeIds) {
        results.push(state.tagsTransferList.facadeItems[transferListFacadeId]);
    }
    return results;
};

export const mapTagStartableSelector = (state: IApplicationState) => {
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

function* mapTag(action: IMapTagLoadingAction) {
    const tagId = action.payload;
    try {
        const facadeIdsToBeMapped: FacadeIds = yield select((state: IApplicationState) => state.tagsTransferList.left);
        const facadesToBeMapped: IFacade[] = yield select(facadeItemsFromIdsSelector(facadeIdsToBeMapped));
        const response: AxiosResponse<IMapTagJobStatus> = yield call(
            tagsTransferListApi.mapTag,
            facadesToBeMapped,
            tagId,
        );
        yield put(handleMapTagJobStatusUpdateAction(response.data));
        yield delay(10000);
        const jobIsStartableAgain = yield select(mapTagStartableSelector);
        if (!jobIsStartableAgain) {
            yield put(
                handleMapTagJobStatusUpdateAction({
                    item: {
                        data: { tagId },
                        details: {
                            message: "Something is taking a while.",
                            resultStatus: ResultStatus.Warning,
                        },
                    },
                    jobStage: JobStage.Warning,
                }),
            );
        }
    } catch (error) {
        const errorInfo = JSON.stringify(error);
        yield put(
            handleMapTagJobStatusUpdateAction({
                item: {
                    data: { tagId },
                    details: {
                        message: errorInfo,
                        resultStatus: ResultStatus.Failure,
                    },
                },
                jobStage: JobStage.Error,
            }),
        );
    }
}

export const registerMapTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushMapTagJobStatusUpdate", (status: IMapTagJobStatus) => {
        dispatch(handleMapTagJobStatusUpdateAction(status));
        // todo what is the gain of this? whatever state diff there is, handle it in the appropriate reducer for this action
        const jobIsDone = status.jobStage === JobStage.Done;
        const currentTag = status.item;
        if (jobIsDone && currentTag) {
            dispatch(getTransferListFacadesLoadingAction(currentTag.data.tagId));
        }
    });
};

export function* watchMapTag() {
    yield takeEvery(MAP_TAG_LOADING, mapTag);
}
