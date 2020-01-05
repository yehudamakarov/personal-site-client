import { FacadeIds } from "../tagsTransferListReducer";

export const SET_INITIALLY_MAPPED = "SET_INITIALLY_MAPPED";

export interface ISetInitiallyMapped {
    type: typeof SET_INITIALLY_MAPPED;
    payload: { left: FacadeIds; right: FacadeIds };
}

export const setInitiallyMappedAction = (left: FacadeIds, right: FacadeIds): ISetInitiallyMapped => ({
    payload: { left, right },
    type: SET_INITIALLY_MAPPED,
});
