import axios, { AxiosResponse } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    GET_PROJECTS_LOADING,
    getProjectsErrorAction,
    getProjectsSuccessAction,
} from "./actions/projects/projectsActions";
import { IProject } from "./reducers/projects/projectsReducer";

interface IPinnedReposResponse {
    data: IProject[];
    reason: any;
}

const projectsApi = {
    getProjectsRequest: () => axios.get<IPinnedReposResponse>(`${process.env.REACT_APP_API_URL}repos/pinnedrepos`),
};

function* getProjectsRequest() {
    try {
        const response: AxiosResponse<IPinnedReposResponse> = yield call(projectsApi.getProjectsRequest);
        const pinnedRepoResponse = response.data;
        yield put(getProjectsSuccessAction(pinnedRepoResponse.data));
    } catch (error) {
        yield put(getProjectsErrorAction());
        console.error(error);
    }
}

function* watchGetProjectsRequest() {
    yield takeEvery(GET_PROJECTS_LOADING, getProjectsRequest);
}

const projectsSagas = [fork(watchGetProjectsRequest)];

export function* rootSaga() {
    yield all([...projectsSagas]);
}
