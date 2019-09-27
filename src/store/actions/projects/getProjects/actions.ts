import { IProject } from "../api";

/* -------------------------------------------------------------------------- */
/*                          getProjectsLoadingAction                          */
/* -------------------------------------------------------------------------- */

export interface IGetProjectsLoadingAction {
    type: typeof GET_PROJECTS_LOADING;
}
export const GET_PROJECTS_LOADING = "GET_PROJECTS_LOADING";

export const getProjectsLoadingAction = (): IGetProjectsLoadingAction => ({
    type: GET_PROJECTS_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          getProjectsSuccessAction                          */
/* -------------------------------------------------------------------------- */

export interface IGetProjectsSuccessAction {
    type: typeof GET_PROJECTS_SUCCESS;
    payload: IProject[];
}
export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";

export const getProjectsSuccessAction = (
    projects: IProject[]
): IGetProjectsSuccessAction => ({
    payload: projects,
    type: GET_PROJECTS_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           getProjectsErrorAction                           */
/* -------------------------------------------------------------------------- */

export interface IGetProjectsErrorAction {
    type: typeof GET_PROJECTS_ERROR;
    payload: Error;
}
export const GET_PROJECTS_ERROR = "GET_PROJECTS_ERROR";

export const getProjectsErrorAction = (
    error: Error
): IGetProjectsErrorAction => ({
    payload: error,
    type: GET_PROJECTS_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type GetProjectsActionTypes =
    | IGetProjectsLoadingAction
    | IGetProjectsSuccessAction
    | IGetProjectsErrorAction;
