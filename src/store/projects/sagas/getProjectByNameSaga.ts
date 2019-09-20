import axios, { AxiosResponse } from "axios";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { IApiResponse } from "../../general/types/IApiResponse";
import { IResultDetails } from "../../pinnedRepositories/types";
import {
    GET_PROJECT_BY_NAME_LOADING,
    getProjectByNameErrorAction,
    getProjectByNameSuccessAction,
} from "../actions/getProjectByName";
import { IGetProjectByNameLoadingAction } from "../actions/getProjectByName/types/IGetProjectByNameLoadingAction";
import { projectsApi, IProjectResponse } from "../api";
import { IProject } from "../types";


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
        debugger;
        yield put(getProjectByNameErrorAction(error, projectName));
    }
}

export function* watchGetProjectByName() {
    yield takeEvery(GET_PROJECT_BY_NAME_LOADING, getProjectByName);
}
