import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { IProjectResponse, projectsApi } from "../api";
import { IUpdateProjectLoading, UPDATE_PROJECT_LOADING, updateProjectError, updateProjectSuccess } from "./actions";

function* updateProject(action: IUpdateProjectLoading) {
    try {
        const project = action.payload;
        const response: AxiosResponse<IProjectResponse> = yield call(
            projectsApi.updateProject,
            project
        );
        yield put(updateProjectSuccess(response.data.data));
    } catch (error) {
        yield put(updateProjectError(error.stack));
    }
}

export function* watchUpdateProject() {
    yield takeEvery(UPDATE_PROJECT_LOADING, updateProject);
}
