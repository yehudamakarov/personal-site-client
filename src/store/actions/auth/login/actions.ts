import { ILoginRequest, ITokenData } from "../api";

/* -------------------------------------------------------------------------- */
/*                          loginLoadingAction                          */
/* -------------------------------------------------------------------------- */
export const LOGIN_LOADING = "LOGIN_LOADING";

export interface ILoginLoadingAction {
    type: typeof LOGIN_LOADING;
    payload: {
        firstName: string;
        lastName: string;
        password: string;
    };
}

export const loginLoadingAction = (
    credentials: ILoginRequest,
): ILoginLoadingAction => ({
    payload: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: credentials.password,
    },
    type: LOGIN_LOADING,
});

/* -------------------------------------------------------------------------- */
/*                          loginSuccessAction                          */
/* -------------------------------------------------------------------------- */
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: ITokenData;
}

export const loginSuccessAction = (
    projects: ITokenData,
): ILoginSuccessAction => ({
    payload: projects,
    type: LOGIN_SUCCESS,
});

/* -------------------------------------------------------------------------- */
/*                           loginErrorAction                           */
/* -------------------------------------------------------------------------- */
export const LOGIN_ERROR = "LOGIN_ERROR";

export interface ILoginErrorAction {
    type: typeof LOGIN_ERROR;
    payload: string;
}

export const loginErrorAction = (error: string): ILoginErrorAction => ({
    payload: error,
    type: LOGIN_ERROR,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type LoginActionTypes =
    | ILoginLoadingAction
    | ILoginSuccessAction
    | ILoginErrorAction;
