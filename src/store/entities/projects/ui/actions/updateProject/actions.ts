/* -------------------------------------------------------------------------- */
/*                          updateProjectLoadingAction                          */
/* -------------------------------------------------------------------------- */

import { IProject } from "../api";

export const UPDATE_PROJECT_LOADING = "UPDATE_PROJECT_LOADING";

export interface IUpdateProjectLoading {
    payload: IProject;
    type: typeof UPDATE_PROJECT_LOADING;
}

export const updateProjectLoading = (
    project: IProject,
): IUpdateProjectLoading => ({
    payload: project,
    type: UPDATE_PROJECT_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          updateProjectSuccessAction                          */
/* -------------------------------------------------------------------------- */

export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";

export interface IUpdateProjectSuccess {
    payload: IProject;
    type: typeof UPDATE_PROJECT_SUCCESS;
}

export const updateProjectSuccess = (
    project: IProject,
): IUpdateProjectSuccess => ({
    payload: project,
    type: UPDATE_PROJECT_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                          updateProjectSuccessAction                          */
/* -------------------------------------------------------------------------- */

export const UPDATE_PROJECT_ERROR = "UPDATE_PROJECT_ERROR";

export interface IUpdateProjectError {
    payload: string;
    type: typeof UPDATE_PROJECT_ERROR;
}

export const updateProjectError = (error: string): IUpdateProjectError => ({
    payload: error,
    type: UPDATE_PROJECT_ERROR,
});

export type UpdateProjectActionTypes =
    | IUpdateProjectLoading
    | IUpdateProjectSuccess
    | IUpdateProjectError;
