// OPEN_DRAWER
export const OPEN_DRAWER = "OPEN_DRAWER";
export const openDrawerAction = (): IOpenDrawerAction => ({
    type: OPEN_DRAWER,
});
export interface IOpenDrawerAction {
    type: typeof OPEN_DRAWER;
}

// CLOSE_DRAWER
export const CLOSE_DRAWER = "CLOSE_DRAWER";
export const closeDrawerAction = (): ICloseDrawerAction => ({
    type: CLOSE_DRAWER,
});
export interface ICloseDrawerAction {
    type: typeof CLOSE_DRAWER;
}

// UNION TYPE
export type UiActionTypes = IOpenDrawerAction | ICloseDrawerAction;
