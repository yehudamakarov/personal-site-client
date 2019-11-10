import { IApiResponse } from "../../../baseTypes/IApiResponse";
import { IProject } from "../api";

/* -------------------------------------------------------------------------- */
/*                        getProjectByNameLoadingAction                       */
/* -------------------------------------------------------------------------- */

export const GET_PROJECT_BY_NAME_LOADING = "GET_PROJECT_BY_NAME_LOADING";
export interface IGetProjectByNameLoadingAction {
    type: typeof GET_PROJECT_BY_NAME_LOADING;
    payload?: string;
}

export const getProjectByNameLoadingAction = (
    projectName?: string
): IGetProjectByNameLoadingAction => ({
    payload: projectName,
    type: GET_PROJECT_BY_NAME_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                        getProjectByNameSuccessAction                       */
/* -------------------------------------------------------------------------- */

export const GET_PROJECT_BY_NAME_SUCCESS = "GET_PROJECT_BY_NAME_SUCCESS";
export interface IGetProjectByNameSuccessAction {
    type: typeof GET_PROJECT_BY_NAME_SUCCESS;
    payload: IApiResponse<IProject>;
}

export const getProjectByNameSuccessAction = (
    projectResponse: IApiResponse<IProject>
): IGetProjectByNameSuccessAction => ({
    payload: projectResponse,
    type: GET_PROJECT_BY_NAME_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                         getProjectByNameErrorAction                        */
/* -------------------------------------------------------------------------- */

export const GET_PROJECT_BY_NAME_ERROR = "GET_PROJECT_BY_NAME_ERROR";
export interface IGetProjectByNameErrorAction {
    type: typeof GET_PROJECT_BY_NAME_ERROR;
    payload: { error: Error; projectName?: string };
}

export const getProjectByNameErrorAction = (
    error: Error,
    projectName?: string
): IGetProjectByNameErrorAction => ({
    payload: { error, projectName },
    type: GET_PROJECT_BY_NAME_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type GetProjectByNameActionsType =
    | IGetProjectByNameErrorAction
    | IGetProjectByNameLoadingAction
    | IGetProjectByNameSuccessAction;
