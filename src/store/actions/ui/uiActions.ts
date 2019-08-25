// OPEN_DRAWER
export const OPEN_DRAWER = 'OPEN_DRAWER'
export const openDrawerAction = (): OpenDrawerAction => ({
    type: OPEN_DRAWER
})
export interface OpenDrawerAction {
    type: typeof OPEN_DRAWER
}

// CLOSE_DRAWER
export const CLOSE_DRAWER = 'CLOSE_DRAWER'
export const closeDrawerAction = (): CloseDrawerAction => ({
    type: CLOSE_DRAWER
})
export interface CloseDrawerAction {
    type: typeof CLOSE_DRAWER
}

// UNION TYPE
export type UiActionTypes = OpenDrawerAction | CloseDrawerAction
