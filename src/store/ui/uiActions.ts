import { IFilter, IFilterListingTypes, Route } from "./IUiState";

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

// SET_TAGS_FOR_FILTER
export const SET_TAGS_FOR_FILTER = "SET_TAGS_FOR_FILTER";
export const setTagsForFilterAction = (
    tagIds: string[],
): ISetTagsForFilterAction => ({
    payload: tagIds,
    type: SET_TAGS_FOR_FILTER,
});

export interface ISetTagsForFilterAction {
    type: typeof SET_TAGS_FOR_FILTER;
    payload: string[];
}

// SET_LISTING_TYPES_FOR_FILTER
export const SET_LISTING_TYPES_FOR_FILTER = "SET_LISTING_TYPES_FOR_FILTER";
export const setListingTypesForFilterAction = (
    listingTypes: IFilterListingTypes,
): ISetListingTypesForFilterAction => ({
    payload: listingTypes,
    type: SET_LISTING_TYPES_FOR_FILTER,
});

export interface ISetListingTypesForFilterAction {
    type: typeof SET_LISTING_TYPES_FOR_FILTER;
    payload: IFilterListingTypes;
}

// SET_ROUTE
export const SET_ROUTE = "SET_ROUTE";
export const setRouteAction = (routeAndUri: {
    route: Route;
    uri: string | undefined;
}): ISetRouteAction => ({
    payload: routeAndUri,
    type: SET_ROUTE,
});

export interface ISetRouteAction {
    type: typeof SET_ROUTE;
    payload: { route: Route; uri: string | undefined };
}

// UNION TYPE
export type UiActionTypes =
    | IOpenDrawerAction
    | ICloseDrawerAction
    | ISetFilterAction
    | ISetTagsForFilterAction
    | ISetListingTypesForFilterAction
    | ISetRouteAction;
