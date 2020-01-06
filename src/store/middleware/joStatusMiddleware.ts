import { Middleware } from "redux";
import { ITokenData } from "../entities/auth/actions/api";
import { LOGIN_SUCCESS } from "../entities/auth/actions/login/actions";
import { IApplicationState } from "../rootReducer";
import { registerJobStatusUpdates } from "../signalR/registerJobStatusUpdates";

export const connectToJobStatusReduxMiddleware: Middleware<{}, IApplicationState> = (api) => (next) => (action) => {
    if (action.type === LOGIN_SUCCESS) {
        const token: ITokenData = action.payload;
        registerJobStatusUpdates(api.dispatch, token);
    }
    return next(action);
};