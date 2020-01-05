/* -------------------------------------------------------------------------- */
/*                          closeTagMapSaveDialogAction                         */
/* -------------------------------------------------------------------------- */

export const CLOSE_TAG_MAP_SAVE_DIALOG = "CLOSE_TAG_MAP_SAVE_DIALOG";

export interface ICloseTagMapSaveDialogAction {
    type: typeof CLOSE_TAG_MAP_SAVE_DIALOG;
}

export const closeTagMapSaveDialogAction = (): ICloseTagMapSaveDialogAction => ({
    type: CLOSE_TAG_MAP_SAVE_DIALOG,
});
