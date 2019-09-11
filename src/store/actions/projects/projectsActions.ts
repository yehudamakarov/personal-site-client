import { IProject } from "../../reducers/projectsReducer";

export const GET_PROJECTS_LOADING = "GET_PROJECTS_LOADING";
export const getProjectsLoadingAction = (): IGetProjectsLoadingAction => ({
    type: GET_PROJECTS_LOADING,
});

export interface IGetProjectsLoadingAction {
    type: typeof GET_PROJECTS_LOADING;
}

export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";
export const getProjectsSuccessAction = (
    projects: IProject[]
): IGetProjectsSuccessAction => ({
    payload: projects,
    type: GET_PROJECTS_SUCCESS,
});

export interface IGetProjectsSuccessAction {
    type: typeof GET_PROJECTS_SUCCESS;
    payload: IProject[];
}

export const GET_PROJECTS_ERROR = "GET_PROJECTS_ERROR";
export const getProjectsErrorAction = (): IGetProjectsErrorAction => ({
    type: GET_PROJECTS_ERROR,
});

export interface IGetProjectsErrorAction {
    type: typeof GET_PROJECTS_ERROR;
}

export type ProjectsActionTypes =
    | IGetProjectsLoadingAction
    | IGetProjectsSuccessAction
    | IGetProjectsErrorAction;
