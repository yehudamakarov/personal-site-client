import { FacadeIds } from "../tagsTransferListReducer";

export const SET_LEFT = "SET_LEFT";

export interface ISetLeft {
    type: typeof SET_LEFT;
    payload: FacadeIds;
}

export const setLeftAction = (facadeIds: FacadeIds): ISetLeft => ({
    payload: facadeIds,
    type: SET_LEFT,
});
