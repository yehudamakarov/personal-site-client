import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { IPinnedReposResponse, pinnedRepositoriesApi } from "../api";
import {
    GET_PINNED_REPOSITORIES_LOADING,
    getPinnedRepositoriesErrorAction,
    getPinnedRepositoriesSuccessAction,
} from "./actions";

function* getPinnedRepositoriesRequest() {
    try {
        const response: AxiosResponse<IPinnedReposResponse> = yield call(
            pinnedRepositoriesApi.getPinnedRepositoriesRequest
        );
        const pinnedRepoResponse = response.data;
        yield put(getPinnedRepositoriesSuccessAction(pinnedRepoResponse.data));
    } catch (error) {
        yield put(getPinnedRepositoriesErrorAction());
    }
}

export function* watchGetPinnedRepositoriesRequest() {
    yield takeEvery(
        GET_PINNED_REPOSITORIES_LOADING,
        getPinnedRepositoriesRequest
    );
}
