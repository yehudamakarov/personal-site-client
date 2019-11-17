/* -------------------------------------------------------------------------- */
/*                          logoutLoadingAction                          */
/* -------------------------------------------------------------------------- */
export const LOGOUT_LOADING = "LOGOUT_LOADING";

export interface ILogoutLoadingAction {
    type: typeof LOGOUT_LOADING;
}

export const logoutLoadingAction = (): ILogoutLoadingAction => ({
    type: LOGOUT_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          logoutSuccessAction                          */
/* -------------------------------------------------------------------------- */
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface ILogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           logoutErrorAction                           */
/* -------------------------------------------------------------------------- */
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export interface ILogoutErrorAction {
    type: typeof LOGOUT_ERROR;
    payload: string;
}

export const logoutErrorAction = (error: string): ILogoutErrorAction => ({
    payload: error,
    type: LOGOUT_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type LogoutActionTypes =
    | ILogoutLoadingAction
    | ILogoutSuccessAction
    | ILogoutErrorAction;
