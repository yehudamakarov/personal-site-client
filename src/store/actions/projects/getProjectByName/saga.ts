import axios, { AxiosResponse } from "axios";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { projectsApi, IProjectResponse } from "../api";
import { IGetProjectByNameLoadingAction, getProjectByNameSuccessAction,  getProjectByNameErrorAction, GET_PROJECT_BY_NAME_LOADING } from "./actions";

function* getProjectByName(action: IGetProjectByNameLoadingAction) {
    try {
        const { payload: projectName } = action;
        if (!projectName) {
            throw new Error("The projectName was undefined.");
        }
        const response: AxiosResponse<IProjectResponse> = yield call(
            projectsApi.getProjectByName,
            projectName
        );
        const projectResponse = response.data;
        yield delay(1000);
        yield put(getProjectByNameSuccessAction(projectResponse));
    } catch (error) {
        const projectName = action.payload;
        yield put(getProjectByNameErrorAction(error, projectName));
    }
}

export function* watchGetProjectByName() {
    yield takeEvery(GET_PROJECT_BY_NAME_LOADING, getProjectByName);
}