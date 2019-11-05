import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { ITagsResponse, tagsApi } from "../api";
import { GET_TAGS_LOADING, getTagsErrorAction, getTagsSuccessAction } from "./actions";

function* getTags() {
    try {
        const response: AxiosResponse<ITagsResponse> = yield call(
            tagsApi.getTags,
        );
        yield put(getTagsSuccessAction(response.data.data));
    } catch (error) {
        const errorContent = JSON.stringify(error);
        yield put(getTagsErrorAction(errorContent));
    }
}

export function* watchGetTags() {
    yield takeEvery(GET_TAGS_LOADING, getTags);
}
