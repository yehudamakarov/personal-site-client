import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { IProjectResponse, projectsApi } from "../api";
import {
    IUpdateProjectLoading,
    UPDATE_PROJECT_LOADING,
    updateProjectError,
    updateProjectSuccess,
} from "./actions";
// import { IProjectResponse, projectsApi } from "../../../ui/actions/api";
// import {
//     GET_PROJECT_BY_NAME_LOADING,
//     getProjectByNameErrorAction,
//     getProjectByNameSuccessAction,
//     IGetProjectByNameLoadingAction,
// } from "./actions";
//
// function* getProjectByName(action: IGetProjectByNameLoadingAction) {
//     try {
//         const { payload: projectName } = action;
//         if (!projectName) {
//             throw new Error("The projectName was undefined.");
//         }
//         const response: AxiosResponse<IProjectResponse> = yield call(
//             projectsApi.getProjectByName,
//             projectName
//         );
//         const projectResponse = response.data;
//         yield delay(1000);
//         yield put(getProjectByNameSuccessAction(projectResponse));
//     } catch (error) {
//         const projectName = action.payload;
//         yield put(getProjectByNameErrorAction(error, projectName));
//     }
// }
//
// export function* watchGetProjectByName() {
//     yield takeEvery(GET_PROJECT_BY_NAME_LOADING, getProjectByName);
// }

function* updateProject(action: IUpdateProjectLoading) {
    try {
        console.count("updating");
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
