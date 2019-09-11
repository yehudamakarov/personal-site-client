import {
    GET_PINNED_REPOSITORIES_ERROR,
    GET_PINNED_REPOSITORIES_LOADING,
    GET_PINNED_REPOSITORIES_SUCCESS,
    PinnedRepositoriesActionTypes,
} from "../actions/pinnedRepositories/pinnedRepositoriesActions";

export interface IPinnedRepository {
    databaseId: string;
    timeFetched: string;
    current: boolean;
    name: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

const INITIAL_STATE: IPinnedRepositoriesState = {
    isError: false,
    isLoading: false,
    pinnedRepositories: [],
};

export interface IPinnedRepositoriesState {
    isLoading: boolean;
    isError: boolean;
    pinnedRepositories: IPinnedRepository[];
}

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
