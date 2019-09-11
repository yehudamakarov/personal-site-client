import { IProject } from "../../reducers/pinnedRepositories/pinnedRepositoriesReducer";

export const GET_PINNED_REPOSITORIES_LOADING = "GET_PinnedRepositories_LOADING";
export const getPinnedRepositoriesLoadingAction = (): IGetPinnedRepositoriesLoadingAction => ({
    type: GET_PINNED_REPOSITORIES_LOADING,
});

export interface IGetPinnedRepositoriesLoadingAction {
    type: typeof GET_PINNED_REPOSITORIES_LOADING;
}

export const GET_PINNED_REPOSITORIES_SUCCESS = "GET_PinnedRepositories_SUCCESS";
export const getPinnedRepositoriesSuccessAction = (
    PinnedRepositories: IProject[]
): IGetPinnedRepositoriesSuccessAction => ({
    payload: PinnedRepositories,
    type: GET_PINNED_REPOSITORIES_SUCCESS,
});

export interface IGetPinnedRepositoriesSuccessAction {
    type: typeof GET_PINNED_REPOSITORIES_SUCCESS;
    payload: IProject[];
}

export const GET_PINNED_REPOSITORIES_ERROR = "GET_PinnedRepositories_ERROR";
export const getPinnedRepositoriesErrorAction = (): IGetPinnedRepositoriesErrorAction => ({
    type: GET_PINNED_REPOSITORIES_ERROR,
});

export interface IGetPinnedRepositoriesErrorAction {
    type: typeof GET_PINNED_REPOSITORIES_ERROR;
}

export type PinnedRepositoriesActionTypes =
    | IGetPinnedRepositoriesLoadingAction
    | IGetPinnedRepositoriesSuccessAction
    | IGetPinnedRepositoriesErrorAction;
