import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
    UiActionTypes,
} from "../actions/ui/uiActions";

export interface IUiState {
    drawerOpen: boolean;
}

const INITIAL_STATE: IUiState = {
    drawerOpen: false,
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
        default:
            return state;
    }
};
