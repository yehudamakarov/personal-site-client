export interface ApplicationState {
    ui: UiState
}

interface UiState {
    drawerOpen: boolean
}

const INITIAL_STATE: UiState = {
    drawerOpen: false
}

const OPEN_DRAWER = 'OPEN_DRAWER'
const CLOSE_DRAWER = 'CLOSE_DRAWER'

interface OpenDrawerAction {
    type: typeof OPEN_DRAWER
}
interface CloseDrawerAction {
    type: typeof CLOSE_DRAWER
}
type UiActionTypes = OpenDrawerAction | CloseDrawerAction

export const openDrawer = (): OpenDrawerAction => ({
    type: OPEN_DRAWER
})
export const closeDrawer = (): CloseDrawerAction => ({
    type: CLOSE_DRAWER
})




const uiReducer = (state = INITIAL_STATE, action: UiActionTypes): UiState => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, drawerOpen: true }
        case CLOSE_DRAWER:
            return { ...state, drawerOpen: false }
        default:
            return state;
    }
}


export default uiReducer