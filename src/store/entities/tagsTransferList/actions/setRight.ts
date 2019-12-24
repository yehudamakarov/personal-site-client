import { FacadeIds } from "../tagsTransferListReducer";

export const SET_RIGHT = "SET_RIGHT";

export interface ISetRight {
    type: typeof SET_RIGHT;
    payload: FacadeIds;
}

export const setRightAction = (ids: FacadeIds): ISetRight => ({
    payload: ids,
    type: SET_RIGHT,
});
