import { IApiResponse } from "../../../general/types/IApiResponse";
import { IProject } from "../../types";
import { IGetProjectByNameErrorAction } from "./types/IGetProjectByNameErrorAction";
import { IGetProjectByNameLoadingAction } from "./types/IGetProjectByNameLoadingAction";
import { IGetProjectByNameSuccessAction } from "./types/IGetProjectByNameSuccessAction";

export const getProjectByNameLoadingAction = (
    projectName?: string
): IGetProjectByNameLoadingAction => ({
    payload: projectName,
    type: GET_PROJECT_BY_NAME_LOADING,
});
export const GET_PROJECT_BY_NAME_LOADING = "GET_PROJECT_BY_NAME_LOADING";

export const getProjectByNameSuccessAction = (
    projectResponse: IApiResponse<IProject>
): IGetProjectByNameSuccessAction => ({
    payload: projectResponse,
    type: GET_PROJECT_BY_NAME_SUCCESS,
});
export const GET_PROJECT_BY_NAME_SUCCESS = "GET_PROJECT_BY_NAME_SUCCESS";

export const getProjectByNameErrorAction = (
    error: Error,
    projectName?: string
): IGetProjectByNameErrorAction => ({
    payload: { error, projectName },
    type: GET_PROJECT_BY_NAME_ERROR,
});
export const GET_PROJECT_BY_NAME_ERROR = "GET_PROJECT_BY_NAME_ERROR";

export type GetProjectByNameActionsType =
    | IGetProjectByNameErrorAction
    | IGetProjectByNameLoadingAction
    | IGetProjectByNameSuccessAction;
