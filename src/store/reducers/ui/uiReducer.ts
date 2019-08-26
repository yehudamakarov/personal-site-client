import { OPEN_DRAWER, CLOSE_DRAWER, UiActionTypes } from "../../actions/ui/uiActions";


export interface UiState {
    drawerOpen: boolean
}

const INITIAL_STATE: UiState = {
    drawerOpen: false
}

export const uiReducer = (state = INITIAL_STATE, action: UiActionTypes): UiState => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, drawerOpen: true }
        case CLOSE_DRAWER:
            return { ...state, drawerOpen: false }
        default:
            return state;
    }
}