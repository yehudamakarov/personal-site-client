import { FacadeIds } from "../tagsTransferListReducer";

export const SET_CHECKED = "SET_CHECKED";

export interface ISetChecked {
    type: typeof SET_CHECKED;
    payload: FacadeIds;
}

export const setCheckedAction = (facadeIds: FacadeIds): ISetChecked => ({
    payload: facadeIds,
    type: SET_CHECKED,
});
