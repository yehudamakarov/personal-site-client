import { ITag } from "../api";

/* -------------------------------------------------------------------------- */
/*                          getTagsLoadingAction                          */
/* -------------------------------------------------------------------------- */
export const GET_TAGS_LOADING = "GET_TAGS_LOADING";

export interface IGetTagsLoadingAction {
    type: typeof GET_TAGS_LOADING;
}

export const getTagsLoadingAction = (): IGetTagsLoadingAction => ({
    type: GET_TAGS_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          getTagsSuccessAction                          */
/* -------------------------------------------------------------------------- */
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";

export interface IGetTagsSuccessAction {
    type: typeof GET_TAGS_SUCCESS;
    payload: ITag[];
}

export const getTagsSuccessAction = (
    tags: ITag[],
): IGetTagsSuccessAction => ({
    payload: tags,
    type: GET_TAGS_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           getTagsErrorAction                           */
/* -------------------------------------------------------------------------- */
export const GET_TAGS_ERROR = "GET_TAGS_ERROR";

export interface IGetTagsErrorAction {
    type: typeof GET_TAGS_ERROR;
    payload: string;
}

export const getTagsErrorAction = (error: string): IGetTagsErrorAction => ({
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
