import { IProject } from "../../types";
import { IGetProjectsErrorAction } from "./types/IGetProjectsErrorAction";
import { IGetProjectsLoadingAction } from "./types/IGetProjectsLoadingAction";
import { IGetProjectsSuccessAction } from "./types/IGetProjectsSuccessAction";

export const GET_PROJECTS_LOADING = "GET_PROJECTS_LOADING";
export const getProjectsLoadingAction = (): IGetProjectsLoadingAction => ({
    type: GET_PROJECTS_LOADING,
});

export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";
export const getProjectsSuccessAction = (
    projects: IProject[]
): IGetProjectsSuccessAction => ({
    payload: projects,
    type: GET_PROJECTS_SUCCESS,
});

export const GET_PROJECTS_ERROR = "GET_PROJECTS_ERROR";
export const getProjectsErrorAction = (
    error: Error
): IGetProjectsErrorAction => ({
    payload: error,
    type: GET_PROJECTS_ERROR,
});

export type GetProjectsActionTypes =
    | IGetProjectsLoadingAction
    | IGetProjectsSuccessAction
    | IGetProjectsErrorAction;
