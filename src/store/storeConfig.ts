import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { throttle } from "lodash";
import createSagaMiddleware from "redux-saga";
import { authHelper } from "../helpers/authHelpers";
import { loadState, saveState } from "../helpers/storeHelpers";
import { configureAxios } from "./axiosConfig";
import { roleType } from "./entities/auth/actions/authReducer";
import { connectToJobStatusReduxMiddleware } from "./middleware/joStatusMiddleware";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { init } from "./signalR/init";
import { INITIAL_STATE } from "./ui/uiReducer";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    middleware: [...getDefaultMiddleware(), connectToJobStatusReduxMiddleware, sagaMiddleware],
    preloadedState: loadState(),
    reducer: rootReducer,
});
sagaMiddleware.run(rootSaga);

const authInfo = store.getState().auth;
const currentAuthStatus = authHelper(authInfo.loggedIn, authInfo.expiryTime, authInfo.role, [roleType.administrator]);
if (currentAuthStatus) {
    init(store.dispatch, authInfo.token);
}

store.subscribe(
    throttle(() => {
        saveState({
            auth: { ...store.getState().auth, responseError: null },
            ui: {
                ...INITIAL_STATE,
                filter: { ...store.getState().ui.filter, searchText: "" },
            },
        });
    }, 1000),
);
configureAxios(store);
