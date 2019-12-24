/* -------------------------------------------------------------------------- */
/*                          getTransferListFacadesLoadingAction               */
/* -------------------------------------------------------------------------- */

import { IFacade } from "../../projects/ui/selectors";

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

/* -------------------------------------------------------------------------- */
/*                          getTransferListFacadesSuccessAction               */
/* -------------------------------------------------------------------------- */

export const GET_TRANSFER_LIST_FACADES_SUCCESS = "GET_TRANSFER_LIST_FACADES_SUCCESS";

export interface IGetTransferListFacadesSuccessAction {
    type: typeof GET_TRANSFER_LIST_FACADES_SUCCESS;
    payload: IFacade[];
}

export const getTransferListFacadesSuccessAction = (facades: IFacade[]): IGetTransferListFacadesSuccessAction => ({
    payload: facades,
    type: GET_TRANSFER_LIST_FACADES_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           getTransferListFacadesErrorAction                */
/* -------------------------------------------------------------------------- */

export const GET_TRANSFER_LIST_FACADES_ERROR = "GET_TRANSFER_LIST_FACADES_ERROR";

export interface IGetTransferListFacadesErrorAction {
    type: typeof GET_TRANSFER_LIST_FACADES_ERROR;
    payload: string;
}

export const getTransferListFacadesErrorAction = (error: string): IGetTransferListFacadesErrorAction => ({
    payload: error,
    type: GET_TRANSFER_LIST_FACADES_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type GetTransferListFacadesActionTypes =
    | IGetTransferListFacadesLoadingAction
    | IGetTransferListFacadesSuccessAction
    | IGetTransferListFacadesErrorAction;
