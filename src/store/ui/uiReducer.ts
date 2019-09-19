import { IUiState } from "./IUiState";
import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
    SET_FILTER,
    UiActionTypes,
} from "./uiActions";

const INITIAL_STATE: IUiState = {
    drawerOpen: false,
    filter: {
        listingType: "all",
        searchText: "",
        tagIds: [],
    },
};

export const uiReducer = (
    state = INITIAL_STATE,
    action: UiActionTypes
): IUiState => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, drawerOpen: true };
        case CLOSE_DRAWER:
            return { ...state, drawerOpen: false };
        case SET_FILTER:
            const { payload: filter } = action;
            return { ...state, filter };
        default:
            return state;
    }
};
