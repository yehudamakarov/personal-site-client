import { IMapTagJobStatus } from "../../../signalR/reducer";
import { IFacade } from "../../projects/ui/selectors";
import { ITag } from "../../tags/actions/api";
import { FacadeIds } from "../tagsTransferListReducer";
// =============================================================================== //
export const GET_TRANSFER_LIST_FACADES_LOADING = "GET_TRANSFER_LIST_FACADES_LOADING";

export interface IGetTransferListFacadesLoadingAction {
    type: typeof GET_TRANSFER_LIST_FACADES_LOADING;
    payload: string | undefined;
}

export const getTransferListFacadesLoadingAction = (
    tagId: string | undefined,
): IGetTransferListFacadesLoadingAction => ({
    payload: tagId,
    type: GET_TRANSFER_LIST_FACADES_LOADING,
});
// =============================================================================== //
export const GET_TRANSFER_LIST_FACADES_SUCCESS = "GET_TRANSFER_LIST_FACADES_SUCCESS";

export interface IGetTransferListFacadesSuccessAction {
    type: typeof GET_TRANSFER_LIST_FACADES_SUCCESS;
    payload: IFacade[];
}

export const getTransferListFacadesSuccessAction = (facades: IFacade[]): IGetTransferListFacadesSuccessAction => ({
    payload: facades,
    type: GET_TRANSFER_LIST_FACADES_SUCCESS,
});
// =============================================================================== //
export const GET_TRANSFER_LIST_FACADES_ERROR = "GET_TRANSFER_LIST_FACADES_ERROR";

export interface IGetTransferListFacadesErrorAction {
    type: typeof GET_TRANSFER_LIST_FACADES_ERROR;
    payload: string;
}

export const getTransferListFacadesErrorAction = (error: string): IGetTransferListFacadesErrorAction => ({
    payload: error,
    type: GET_TRANSFER_LIST_FACADES_ERROR,
});
// =============================================================================== //
export const SET_INITIALLY_MAPPED = "SET_INITIALLY_MAPPED";

export interface ISetInitiallyMapped {
    type: typeof SET_INITIALLY_MAPPED;
    payload: { left: FacadeIds; right: FacadeIds };
}

export const setInitiallyMappedAction = (left: FacadeIds, right: FacadeIds): ISetInitiallyMapped => ({
    payload: { left, right },
    type: SET_INITIALLY_MAPPED,
});
// =============================================================================== //
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
// =============================================================================== //
export const SET_RIGHT = "SET_RIGHT";

export interface ISetRight {
    type: typeof SET_RIGHT;
    payload: FacadeIds;
}

export const setRightAction = (ids: FacadeIds): ISetRight => ({
    payload: ids,
    type: SET_RIGHT,
});
// =============================================================================== //
export const SET_LEFT = "SET_LEFT";

export interface ISetLeft {
    type: typeof SET_LEFT;
    payload: FacadeIds;
}

export const setLeftAction = (facadeIds: FacadeIds): ISetLeft => ({
    payload: facadeIds,
    type: SET_LEFT,
});
// =============================================================================== //
export const OPEN_TAG_MAP_SAVE_DIALOG = "OPEN_TAG_MAP_SAVE_DIALOG";

export interface IOpenTagMapSaveDialogAction {
    type: typeof OPEN_TAG_MAP_SAVE_DIALOG;
}

export const openTagMapSaveDialogAction = (): IOpenTagMapSaveDialogAction => ({
    type: OPEN_TAG_MAP_SAVE_DIALOG,
});
// =============================================================================== //
export const CLOSE_TAG_MAP_SAVE_DIALOG = "CLOSE_TAG_MAP_SAVE_DIALOG";

export interface ICloseTagMapSaveDialogAction {
    type: typeof CLOSE_TAG_MAP_SAVE_DIALOG;
}

export const closeTagMapSaveDialogAction = (): ICloseTagMapSaveDialogAction => ({
    type: CLOSE_TAG_MAP_SAVE_DIALOG,
});
// =============================================================================== //
export const HANDLE_MAP_TAG_JOB_STATUS_UPDATE = "HANDLE_MAP_TAG_JOB_STATUS_UPDATE";

export interface IHandleMapTagJobStatusUpdateAction {
    type: typeof HANDLE_MAP_TAG_JOB_STATUS_UPDATE;
    payload: IMapTagJobStatus;
}

export const handleMapTagJobStatusUpdateAction = (status: IMapTagJobStatus): IHandleMapTagJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
});
// =============================================================================== //
/* -------------------------------------------------------------------------- */
/*                          mapTagLoadingAction                         */
/* -------------------------------------------------------------------------- */

export const MAP_TAG_LOADING = "MAP_TAG_LOADING";

export interface IMapTagLoadingAction {
    type: typeof MAP_TAG_LOADING;
    payload: ITag["tagId"];
}

export const mapTagLoadingAction = (tagId: ITag["tagId"]): IMapTagLoadingAction => ({
    payload: tagId,
    type: MAP_TAG_LOADING,
});

export type TagsTransferListActionTypes =
    | IGetTransferListFacadesLoadingAction
    | IGetTransferListFacadesSuccessAction
    | IGetTransferListFacadesErrorAction
    | ISetInitiallyMapped
    | ISetChecked
    | ISetRight
    | ISetLeft
    | IOpenTagMapSaveDialogAction
    | ICloseTagMapSaveDialogAction
    | IHandleMapTagJobStatusUpdateAction;
