import { HubConnection } from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { DELETE_TAG_LOADING } from "../../../store/signalR/actions/JobStatusUpdateActions";
import { IDeleteTagJobStatusLookup } from "../../../store/signalR/reducer";
import { dashboardTagsApi } from "./tagsJobsApi";

export const registerDeleteTagSagaEvents = (connection: HubConnection, dispatch: EnhancedStore["dispatch"]) => {
};

function* deleteTag() {
    try {
        const response: AxiosResponse<IDeleteTagJobStatusLookup> = yield call(
            dashboardTagsApi.deleteTag,
        );
        yield put(deleteTagSuccessAction(response.data.data));
    } catch (error) {
        yield put(deleteTagErrorAction(JSON.parse(error)));
    }
}

export function* watchDeleteTag() {
    yield takeEvery(DELETE_TAG_LOADING, deleteTag);
}