import { FacadeIds } from "../tagsTransferListReducer";

export const SET_CHECKED = "SET_CHECKED";

export interface ISetChecked {
    meta?: string;
    type: typeof SET_CHECKED;
    payload: FacadeIds;
}

export const setCheckedAction = (facadeIds: FacadeIds, meta?: string): ISetChecked => ({
    meta,
    payload: facadeIds,
    type: SET_CHECKED,
});
