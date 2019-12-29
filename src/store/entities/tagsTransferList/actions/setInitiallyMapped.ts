import { FacadeIds } from "../tagsTransferListReducer";

export const SET_INITIALLY_MAPPED = "SET_INITIALLY_MAPPED";

export interface ISetInitiallyMapped {
    type: typeof SET_INITIALLY_MAPPED;
    payload: FacadeIds;
}

export const setInitiallyMappedAction = (facadeIds: FacadeIds): ISetInitiallyMapped => ({
    payload: facadeIds,
    type: SET_INITIALLY_MAPPED,
});
