import axios, { AxiosResponse } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    GET_PINNED_REPOSITORIES_LOADING,
    getPinnedRepositoriesErrorAction,
    getPinnedRepositoriesSuccessAction,
} from "./actions/pinnedRepositories/pinnedRepositoriesActions";
import { IPinnedRepository } from "./reducers/pinnedRepositoriesReducer";

interface IPinnedReposResponse {
    data: IPinnedRepository[];
    reason: any;
}

const PinnedRepositoriesApi = {
    getPinnedRepositoriesRequest: () =>
        axios.get<IPinnedReposResponse>(
            `${process.env.REACT_APP_API_URL}repos/pinnedrepos`
        ),
};

function* getPinnedRepositoriesRequest() {
    try {
        const response: AxiosResponse<IPinnedReposResponse> = yield call(
            PinnedRepositoriesApi.getPinnedRepositoriesRequest
        );
        const pinnedRepoResponse = response.data;
        yield put(getPinnedRepositoriesSuccessAction(pinnedRepoResponse.data));
    } catch (error) {
        yield put(getPinnedRepositoriesErrorAction());
        console.error(error);
    }
}

function* watchGetPinnedRepositoriesRequest() {
    yield takeEvery(
        GET_PINNED_REPOSITORIES_LOADING,
        getPinnedRepositoriesRequest
    );
}

const PinnedRepositoriesSagas = [fork(watchGetPinnedRepositoriesRequest)];

export function* rootSaga() {
    yield all([...PinnedRepositoriesSagas]);
}
