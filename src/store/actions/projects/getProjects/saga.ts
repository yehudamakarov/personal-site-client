import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { IProjectResponse, IProjectsResponse, projectsApi } from "../api";
import {
    GET_PROJECTS_LOADING,
    getProjectsErrorAction,
    getProjectsSuccessAction,
} from "./actions";

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