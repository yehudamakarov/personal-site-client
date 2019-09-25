import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    GET_PROJECTS_LOADING,
    getProjectsErrorAction,
    getProjectsSuccessAction,
} from "../actions/getProjects";
import { IProjectResponse, IProjectsResponse, projectsApi } from "../api";

function* getProjects() {
    try {
        const response: AxiosResponse<IProjectsResponse> = yield call(
            projectsApi.getProjects
        );
        yield put(getProjectsSuccessAction(response.data.data));
    } catch (error) {
        yield put(getProjectsErrorAction(error));
    }
}

export function* watchGetProjects() {
    yield takeEvery(GET_PROJECTS_LOADING, getProjects);
}
