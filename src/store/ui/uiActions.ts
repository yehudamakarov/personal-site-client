import { IFilter } from "./IUiState";

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

// SET_FILTER
export const SET_FILTER = "SET_FILTER";
export const setFilterAction = (filter: IFilter): ISetFilterAction => ({
    payload: filter,
    type: SET_FILTER,
});

export interface ISetFilterAction {
    type: typeof SET_FILTER;
    payload: IFilter;
}

// UNION TYPE
export type UiActionTypes =
    | IOpenDrawerAction
    | ICloseDrawerAction
    | ISetFilterAction;
