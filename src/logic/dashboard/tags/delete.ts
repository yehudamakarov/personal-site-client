import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    DELETE_TAG_LOADING,
    handleDeleteTagJobStatusUpdateAction,
    IDeleteTagLoadingAction,
} from "../../../store/signalR/actions/JobStatusUpdateActions";
import { DeleteTagJobStatus } from "../../../store/signalR/reducer";
import { dashboardTagsApi } from "./tagsJobsApi";

export const registerDeleteTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("pushDeleteTagJobStatusUpdate", (status: DeleteTagJobStatus) => {
        dispatch(handleDeleteTagJobStatusUpdateAction(status));
    });
};

function* deleteTag(action: IDeleteTagLoadingAction) {
    try {
        const { payload: tagId } = action;
        const response: AxiosResponse<DeleteTagJobStatus> = yield call(dashboardTagsApi.deleteTag, tagId, tagId);
        yield put(handleDeleteTagJobStatusUpdateAction(response.data));
    } catch (error) {
        // yield put(deleteTagErrorAction(JSON.parse(error)));
    }
}

export function* watchDeleteTag() {
    yield takeEvery(DELETE_TAG_LOADING, deleteTag);
}
