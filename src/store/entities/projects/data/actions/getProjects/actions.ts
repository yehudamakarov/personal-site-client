import { IProject } from "../../../ui/actions/api";

/* -------------------------------------------------------------------------- */
/*                          getProjectsLoadingAction                          */
/* -------------------------------------------------------------------------- */

export const GET_PROJECTS_LOADING = "GET_PROJECTS_LOADING";

export interface IGetProjectsLoadingAction {
    type: typeof GET_PROJECTS_LOADING;
}

export const getProjectsLoadingAction = (): IGetProjectsLoadingAction => ({
    type: GET_PROJECTS_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          getProjectsSuccessAction                          */
/* -------------------------------------------------------------------------- */

export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";

export interface IGetProjectsSuccessAction {
    type: typeof GET_PROJECTS_SUCCESS;
    payload: IProject[];
}

export const getProjectsSuccessAction = (
    projects: IProject[]
): IGetProjectsSuccessAction => ({
    payload: projects,
    type: GET_PROJECTS_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           getProjectsErrorAction                           */
/* -------------------------------------------------------------------------- */

export const GET_PROJECTS_ERROR = "GET_PROJECTS_ERROR";

export interface IGetProjectsErrorAction {
    type: typeof GET_PROJECTS_ERROR;
    payload: string;
}

export const getProjectsErrorAction = (
    error: string,
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
