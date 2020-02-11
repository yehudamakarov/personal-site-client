import { Tag } from "../../../store/entities/tags/actions/api";

export const OPEN_TAG_RENAME_DIALOG = "OPEN_TAG_RENAME_DIALOG";
export interface IOpenTagRenameDialogAction {
    type: typeof OPEN_TAG_RENAME_DIALOG;
    payload: Tag["tagId"];
}
export const openTagRenameDialogAction = (tagId: Tag["tagId"]): IOpenTagRenameDialogAction => ({
    payload: tagId,
    type: OPEN_TAG_RENAME_DIALOG,
});
// =============================================================================== //
export const CLOSE_TAG_RENAME_DIALOG = "CLOSE_TAG_RENAME_DIALOG";

export interface ICloseTagRenameDialogAction {
    type: typeof CLOSE_TAG_RENAME_DIALOG;
}

export const closeTagRenameDialogAction = (): ICloseTagRenameDialogAction => ({
    type: CLOSE_TAG_RENAME_DIALOG,
});
// =============================================================================== //
export const OPEN_TAG_DELETE_DIALOG = "OPEN_TAG_DELETE_DIALOG";

export interface IOpenTagDeleteDialogAction {
    type: typeof OPEN_TAG_DELETE_DIALOG;
    payload: Tag["tagId"];
}

export const openTagDeleteDialogAction = (tagId: Tag["tagId"]): IOpenTagDeleteDialogAction => ({
    payload: tagId,
    type: OPEN_TAG_DELETE_DIALOG,
});
// =============================================================================== //
export const CLOSE_TAG_DELETE_DIALOG = "CLOSE_TAG_DELETE_DIALOG";

export interface ICloseTagDeleteDialogAction {
    type: typeof CLOSE_TAG_DELETE_DIALOG;
}

export const closeTagDeleteDialogAction = (): ICloseTagDeleteDialogAction => ({
    type: CLOSE_TAG_DELETE_DIALOG,
});
// =============================================================================== //

export type TagManagementActions =
    | IOpenTagRenameDialogAction
    | ICloseTagRenameDialogAction
    | IOpenTagDeleteDialogAction
    | ICloseTagDeleteDialogAction;
