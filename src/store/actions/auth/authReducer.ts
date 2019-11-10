import jwtDecode from "jwt-decode";
import { LoginActionTypes } from "./login/actions";
import { LogoutActionTypes } from "./logout/actions";

enum roleType {
    administrator = "Administrator",
    user = "User",
}

interface ITokenState {
    token: string | null;
    errorReadingToken: boolean;
    expiryTime: number | null;
    firstName: string | null;
    lastName: string | null;
    role: roleType;
}

export interface IAuthState extends ITokenState {
    loading: boolean;
    loggedIn: boolean;
    errorReadingToken: boolean;
}

type AuthActionTypes = LoginActionTypes | LogoutActionTypes;

const INITIAL_STATE: IAuthState = {
    errorReadingToken: false,
    expiryTime: null,
    firstName: null,
    lastName: null,
    loading: false,
    loggedIn: false,
    role: roleType.user,
    token: null,
};

function readToken(token: string): ITokenState {
    interface IToken {
        role: roleType;
        firstName: string;
        lastName: string;
        nbf: number;
        exp: number;
        iat: number;
    }

    try {
        const decoded = jwtDecode<IToken>(token);
        return {
            errorReadingToken: false,
            expiryTime: decoded.exp,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            role: decoded.role,
            token,
        };
    } catch (e) {
        return {
            errorReadingToken: true,
            expiryTime: null,
            firstName: null,
            lastName: null,
            role: roleType.user,
            token,
        };
    }
}

export const authReducer = (
    state = INITIAL_STATE,
    action: AuthActionTypes
): IAuthState => {
    switch (action.type) {
        case "LOGIN_LOADING":
            return { ...state, loading: true };
        case "LOGIN_SUCCESS":
            const token = action.payload;
            const tokenInfo = readToken(token);
            return { ...state, loading: false, loggedIn: true, ...tokenInfo };
        case "LOGIN_ERROR":
            return state;
        case "LOGOUT_LOADING":
            localStorage.clear();
            return { ...INITIAL_STATE };
        case "LOGOUT_SUCCESS":
            return state;
        case "LOGOUT_ERROR":
            return state;
        default:
            return state;
    }
};
