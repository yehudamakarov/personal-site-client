import { IUiState } from "./IUiState";
import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
    SET_FILTER,
    SET_LISTING_TYPES_FOR_FILTER,
    SET_ROUTE,
    SET_TAGS_FOR_FILTER,
    UiActionTypes,
} from "./uiActions";

export const INITIAL_STATE: IUiState = {
    drawerOpen: false,
    filter: {
        listingTypes: {
            blogPosts: false,
            projects: false,
        },
        searchText: "",
        tagIds: [],
    },
    route: "/",
    uri: "/",
};

export const uiReducer = (
    state = INITIAL_STATE,
    action: UiActionTypes
): IUiState => {
    switch (action.type) {
        case OPEN_DRAWER: {
            return { ...state, drawerOpen: true };
        }
        case CLOSE_DRAWER: {
            return { ...state, drawerOpen: false };
        }
        case SET_ROUTE: {
            return {
                ...state,
                route: action.payload.route,
                uri: action.payload.uri,
            };
        }
        case SET_FILTER: {
            const { payload: filter } = action;
            return { ...state, filter };
        }
        case SET_TAGS_FOR_FILTER: {
            const { payload: tagIds } = action;
            return { ...state, filter: { ...state.filter, tagIds } };
        }
        case SET_LISTING_TYPES_FOR_FILTER: {
            const { payload: listingTypes } = action;
            return { ...state, filter: { ...state.filter, listingTypes } };
        }
        default:
            return state;
    }
};
