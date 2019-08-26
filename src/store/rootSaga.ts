import { all, fork, call, put, takeEvery } from "redux-saga/effects"
import { GET_PROJECTS_LOADING, getProjectsSuccessAction, getProjectsErrorAction, } from "./actions/projects/projectsActions";
import axios, { AxiosResponse } from "axios";
import { Project } from "./reducers/projects/projectsReducer";

interface PinnedReposResponse {
    data: Project[],
    reason: any
}

const projectsApi = {
    getProjectsRequest: () => axios.get<PinnedReposResponse>('https://yehudamakarov.com/api/repos/pinnedrepos')
}

function* getProjectsRequest() {
    try {
        const response: AxiosResponse<PinnedReposResponse> = yield call(projectsApi.getProjectsRequest);
        const pinnedRepoResponse = response.data;
        yield put(getProjectsSuccessAction(pinnedRepoResponse.data))
    } catch (error) {
        yield put(getProjectsErrorAction())
        console.error(error);
    }
}

function* watchGetProjectsRequest() {
    yield takeEvery(GET_PROJECTS_LOADING, getProjectsRequest)
}

const projectsSagas = [fork(watchGetProjectsRequest)]

export function* rootSaga() {
    yield all([...projectsSagas])
}
