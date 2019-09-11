import { AxiosResponse } from "axios";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
    GET_PINNED_REPOSITORIES_LOADING,
    getPinnedRepositoriesErrorAction,
    getPinnedRepositoriesSuccessAction,
} from "../actions/getPinnedRepositories";
import { IPinnedReposResponse, pinnedRepositoriesApi } from "../api";

function* getPinnedRepositoriesRequest() {
    try {
        const response: AxiosResponse<IPinnedReposResponse> = yield call(
            pinnedRepositoriesApi.getPinnedRepositoriesRequest
        );
        const pinnedRepoResponse = response.data;
        yield put(getPinnedRepositoriesSuccessAction(pinnedRepoResponse.data));
    } catch (error) {
        yield put(getPinnedRepositoriesErrorAction());
        console.error(error);
    }
}

export function* watchGetPinnedRepositoriesRequest() {
    yield takeEvery(
        GET_PINNED_REPOSITORIES_LOADING,
        getPinnedRepositoriesRequest
    );
}
