import { IPinnedRepository } from "../../types/IPinnedRepository";
import { IGetPinnedRepositoriesErrorAction } from "./types/IGetPinnedRepositoriesErrorAction";
import { IGetPinnedRepositoriesLoadingAction } from "./types/IGetPinnedRepositoriesLoadingAction";
import { IGetPinnedRepositoriesSuccessAction } from "./types/IGetPinnedRepositoriesSuccessAction";

export const getPinnedRepositoriesLoadingAction = (): IGetPinnedRepositoriesLoadingAction => ({
    type: GET_PINNED_REPOSITORIES_LOADING,
});
export const GET_PINNED_REPOSITORIES_LOADING =
    "GET_PINNED_REPOSITORIES_LOADING";

export const getPinnedRepositoriesSuccessAction = (
    PinnedRepositories: IPinnedRepository[]
): IGetPinnedRepositoriesSuccessAction => ({
    payload: PinnedRepositories,
    type: GET_PINNED_REPOSITORIES_SUCCESS,
});
export const GET_PINNED_REPOSITORIES_SUCCESS =
    "GET_PINNED_REPOSITORIES_SUCCESS";

export const getPinnedRepositoriesErrorAction = (): IGetPinnedRepositoriesErrorAction => ({
    type: GET_PINNED_REPOSITORIES_ERROR,
});
export const GET_PINNED_REPOSITORIES_ERROR = "GET_PINNED_REPOSITORIES_ERROR";

export type PinnedRepositoriesActionTypes =
    | IGetPinnedRepositoriesLoadingAction
    | IGetPinnedRepositoriesSuccessAction
    | IGetPinnedRepositoriesErrorAction;
