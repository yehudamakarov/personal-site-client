import { IPinnedRepository } from "./api";
import {
    GET_PINNED_REPOSITORIES_ERROR,
    GET_PINNED_REPOSITORIES_LOADING,
    GET_PINNED_REPOSITORIES_SUCCESS,
    PinnedRepositoriesActionTypes,
} from "./getPinnedRepositories/actions";

export interface IPinnedRepositoriesState {
    isLoading: boolean;
    isError: boolean;
    pinnedRepositories: IPinnedRepository[];
}

const INITIAL_STATE: IPinnedRepositoriesState = {
    isError: false,
    isLoading: false,
    pinnedRepositories: [],
};

export const pinnedRepositoriesReducer = (
    state = INITIAL_STATE,
    action: PinnedRepositoriesActionTypes
): IPinnedRepositoriesState => {
    switch (action.type) {
        case GET_PINNED_REPOSITORIES_LOADING:
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        case GET_PINNED_REPOSITORIES_SUCCESS:
            return {
                isError: false,
                isLoading: false,
                pinnedRepositories: action.payload,
            };
        case GET_PINNED_REPOSITORIES_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
};
