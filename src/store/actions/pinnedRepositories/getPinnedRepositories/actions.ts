import { IPinnedRepository } from "../api";

/* -------------------------------------------------------------------------- */
/*                     getPinnedRepositoriesLoadingAction                     */
/* -------------------------------------------------------------------------- */

export const GET_PINNED_REPOSITORIES_LOADING =
    "GET_PINNED_REPOSITORIES_LOADING";
export interface IGetPinnedRepositoriesLoadingAction {
    type: typeof GET_PINNED_REPOSITORIES_LOADING;
}

export const getPinnedRepositoriesLoadingAction = (): IGetPinnedRepositoriesLoadingAction => ({
    type: GET_PINNED_REPOSITORIES_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                     getPinnedRepositoriesSuccessAction                     */
/* -------------------------------------------------------------------------- */

export const GET_PINNED_REPOSITORIES_SUCCESS =
    "GET_PINNED_REPOSITORIES_SUCCESS";
export interface IGetPinnedRepositoriesSuccessAction {
    type: typeof GET_PINNED_REPOSITORIES_SUCCESS;
    payload: IPinnedRepository[];
}

export const getPinnedRepositoriesSuccessAction = (
    PinnedRepositories: IPinnedRepository[]
): IGetPinnedRepositoriesSuccessAction => ({
    payload: PinnedRepositories,
    type: GET_PINNED_REPOSITORIES_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                      getPinnedRepositoriesErrorAction                      */
/* -------------------------------------------------------------------------- */

export const GET_PINNED_REPOSITORIES_ERROR = "GET_PINNED_REPOSITORIES_ERROR";
export interface IGetPinnedRepositoriesErrorAction {
    type: typeof GET_PINNED_REPOSITORIES_ERROR;
}

export const getPinnedRepositoriesErrorAction = (): IGetPinnedRepositoriesErrorAction => ({
    type: GET_PINNED_REPOSITORIES_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type PinnedRepositoriesActionTypes =
    | IGetPinnedRepositoriesLoadingAction
    | IGetPinnedRepositoriesSuccessAction
    | IGetPinnedRepositoriesErrorAction;
