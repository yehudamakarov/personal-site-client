import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { ResultStatus } from "../../../../baseTypes/ResultStatus";
import { IApplicationState } from "../../../../rootReducer";
import { JobStage } from "../../../../signalR/init";
import { IMapTagJobStatus } from "../../../../signalR/reducer";
import { IFacade } from "../../../projects/ui/selectors";
import { MapTagResponse, tagsTransferListApi } from "../../api";
import { FacadeIds } from "../../tagsTransferListReducer";
import {
    handleMapTagJobStatusUpdateAction,
    IMapTagLoadingAction,
    MAP_TAG_JOB_BEGINNING,
    mapTagJobFailedAction,
} from "../handleMapTagJobStatusUpdate";

const facadeItemsFromIdsSelector = (facadeIds: FacadeIds) => (state: IApplicationState): IFacade[] => {
    const results: IFacade[] = [];
    for (const transferListFacadeId of facadeIds) {
        results.push(state.tagsTransferList.facadeItems[transferListFacadeId]);
    }
    return results;
};

function* mapTag(action: IMapTagLoadingAction) {
    try {
        const tagId = action.payload;
        const facadeIdsToBeMapped: FacadeIds = yield select((state: IApplicationState) => state.tagsTransferList.left);
        const facadesToBeMapped: IFacade[] = yield select(facadeItemsFromIdsSelector(facadeIdsToBeMapped));
        const response: AxiosResponse<MapTagResponse> = yield call(
            tagsTransferListApi.mapTag,
            facadesToBeMapped,
            tagId
        );
        yield put(
            handleMapTagJobStatusUpdateAction({
                jobStage: JobStage.InProgress,
                tagResult: {
                    data: { tagId: response.data.data },
                    details: { resultStatus: ResultStatus.Success, message: "Received 202, began job." },
                },
            })
        );
        // yield put();
        // when web socket broadcasts success, save tagId to 'map successful'
        // after delay(10000) check if successful or error and then if socket is connected
    } catch (error) {
        yield put(mapTagJobFailedAction(JSON.stringify(error)));
    }
}

export const registerMapTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushMapTagJobStatusUpdate", (status: IMapTagJobStatus) => {
        dispatch(handleMapTagJobStatusUpdateAction(status));
    });
};

export function* watchMapTag() {
    yield takeEvery(MAP_TAG_JOB_BEGINNING, mapTag);
}
