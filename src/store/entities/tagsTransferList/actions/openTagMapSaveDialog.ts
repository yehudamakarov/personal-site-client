/* -------------------------------------------------------------------------- */
/*                          openTagMapSaveDialogAction                         */
/* -------------------------------------------------------------------------- */

export const OPEN_TAG_MAP_SAVE_DIALOG = "OPEN_TAG_MAP_SAVE_DIALOG";

export interface IOpenTagMapSaveDialogAction {
    type: typeof OPEN_TAG_MAP_SAVE_DIALOG;
}

export const openTagMapSaveDialogAction = (): IOpenTagMapSaveDialogAction => ({
    type: OPEN_TAG_MAP_SAVE_DIALOG,
});
