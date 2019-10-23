import { ITag } from "../api";

/* -------------------------------------------------------------------------- */
/*                          getTagsLoadingAction                          */
/* -------------------------------------------------------------------------- */

export interface IGetTagsLoadingAction {
    type: typeof GET_TAGS_LOADING;
}
export const GET_TAGS_LOADING = "GET_TAGS_LOADING";

export const getTagsLoadingAction = (): IGetTagsLoadingAction => ({
    type: GET_TAGS_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          getTagsSuccessAction                          */
/* -------------------------------------------------------------------------- */

export interface IGetTagsSuccessAction {
    type: typeof GET_TAGS_SUCCESS;
    payload: ITag[];
}
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";

export const getTagsSuccessAction = (
    projects: ITag[]
): IGetTagsSuccessAction => ({
    payload: projects,
    type: GET_TAGS_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           getTagsErrorAction                           */
/* -------------------------------------------------------------------------- */

export interface IGetTagsErrorAction {
    type: typeof GET_TAGS_ERROR;
    payload: Error;
}
export const GET_TAGS_ERROR = "GET_TAGS_ERROR";

export const getTagsErrorAction = (error: Error): IGetTagsErrorAction => ({
    payload: error,
    type: GET_TAGS_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type GetTagsActionTypes =
    | IGetTagsLoadingAction
    | IGetTagsSuccessAction
    | IGetTagsErrorAction;
