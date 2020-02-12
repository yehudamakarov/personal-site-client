import { Tag } from "../../../store/entities/tags/actions/api";

export const SET_CURRENT_TAG_ID_BEING_MAPPED = "SET_CURRENT_TAG_ID_BEING_MAPPED";

export interface ISetCurrentTagIdBeingMappedAction {
    type: typeof SET_CURRENT_TAG_ID_BEING_MAPPED;
    payload: Tag["tagId"];
}

export const setCurrentTagIdBeingMappedAction = (tagId: Tag["tagId"]): ISetCurrentTagIdBeingMappedAction => ({
    payload: tagId,
    type: SET_CURRENT_TAG_ID_BEING_MAPPED,
});
// =============================================================================== //
export const SET_CURRENT_TAG_ID_BEING_DELETED = "SET_CURRENT_TAG_ID_BEING_DELETED";

export interface ISetCurrentTagIdBeingDeletedAction {
    type: typeof SET_CURRENT_TAG_ID_BEING_DELETED;
    payload: Tag["tagId"];
}

export const setCurrentTagIdBeingDeletedAction = (tagId: Tag["tagId"]): ISetCurrentTagIdBeingDeletedAction => ({
    payload: tagId,
    type: SET_CURRENT_TAG_ID_BEING_DELETED,
});
// =============================================================================== //
