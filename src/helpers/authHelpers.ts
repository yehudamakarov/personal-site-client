import { EnhancedStore } from "@reduxjs/toolkit";
import { IAuthState, ITokenState, roleType } from "../store/entities/auth/actions/authReducer";
import { IApplicationState } from "../store/rootReducer";

export const getToken = (store: EnhancedStore<IApplicationState>): ITokenState["token"] => store.getState().auth.token;

export const authHelper = (
    loggedIn: IAuthState["loggedIn"],
    expiryTime: ITokenState["expiryTime"],
    currentRole: roleType,
    allowedRoles?: roleType[],
) => {
    if (!loggedIn) {
        return false;
    }
    if (expiryTime && expiryTime * 1000 <= Date.now()) {
        return false;
    }
    if (!allowedRoles) {
        return true;
    }
    return allowedRoles.some((possibleRole) => possibleRole === currentRole);
};
