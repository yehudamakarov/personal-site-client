import { Project } from "../../reducers/projects/projectsReducer";

export const GET_PROJECTS_LOADING = "GET_PROJECTS_LOADING";
export const getProjectsLoadingAction = (): GetProjectsLoadingAction => ({
    type: GET_PROJECTS_LOADING
})
export interface GetProjectsLoadingAction {
    type: typeof GET_PROJECTS_LOADING
}

export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";
export const getProjectsSuccess = (projects: Project[]): GetProjectsSuccessAction => ({
    type: GET_PROJECTS_SUCCESS,
    payload: projects
})
export interface GetProjectsSuccessAction {
    type: typeof GET_PROJECTS_SUCCESS,
    payload: Project[]
}

export const GET_PROJECTS_ERROR = "GET_PROJECTS_ERROR";
export const getProjectsErrorAction = (): GetProjectsErrorAction => ({
    type: GET_PROJECTS_ERROR
})
export interface GetProjectsErrorAction {
    type: typeof GET_PROJECTS_ERROR
}

export type ProjectsActionTypes = GetProjectsLoadingAction | GetProjectsSuccessAction | GetProjectsErrorAction
