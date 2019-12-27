/* -------------------------------------------------------------------------- */
/*                          mapTagLoadingAction                       */
/* -------------------------------------------------------------------------- */

import { ITag } from "../../tags/actions/api";

export const MAP_TAG_LOADING = "SAVE_MAPPED_TAGS_LOADING";

export interface IMapTagLoadingAction {
    type: typeof MAP_TAG_LOADING;
    payload: ITag["tagId"];
}

export const mapTagLoadingAction = (tagId: ITag["tagId"]): IMapTagLoadingAction => ({
    payload: tagId,
    type: MAP_TAG_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          mapTagSuccessAction                       */
/* -------------------------------------------------------------------------- */

export const MAP_TAG_SUCCESS = "MAP_TAG_SUCCESS";

export interface IMapTagSuccessAction {
    type: typeof MAP_TAG_SUCCESS;
    payload: boolean;
}

export const mapTagSuccessAction = (success: boolean): IMapTagSuccessAction => ({
    payload: success,
    type: MAP_TAG_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           mapTagErrorAction                        */
/* -------------------------------------------------------------------------- */

export const MAP_TAG_ERROR = "MAP_TAG_ERROR";

export interface IMapTagErrorAction {
    type: typeof MAP_TAG_ERROR;
    payload: string;
}

export const mapTagErrorAction = (error: string): IMapTagErrorAction => ({
    payload: error,
    type: MAP_TAG_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type mapTag = IMapTagLoadingAction | IMapTagSuccessAction | IMapTagErrorAction;
