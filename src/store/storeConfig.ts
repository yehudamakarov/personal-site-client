import * as signalR from "@microsoft/signalr";
import { navigate } from "@reach/router";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { throttle } from "lodash";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { IAuthState } from "./entities/auth/actions/authReducer";
import { logoutLoadingAction } from "./entities/auth/actions/logout/actions";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { IUiState, Routes } from "./ui/IUiState";
import { INITIAL_STATE } from "./ui/uiReducer";

const sagaMiddleware = createSagaMiddleware();

function loadState() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        return state;
    } catch (e) {
        return undefined;
    }
}

function saveState(savableState: { auth: IAuthState; ui: IUiState }) {
    try {
        const serializedState = JSON.stringify(savableState);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.log(e);
    }
}

export const store = configureStore({
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    preloadedState: loadState(),
    reducer: rootReducer,
});

store.subscribe(
    throttle(() => {
        saveState({
            auth: { ...store.getState().auth, responseError: null },
            ui: {
                ...INITIAL_STATE,
                filter: { ...store.getState().ui.filter, searchText: "" },
            },
        });
    }, 1000)
);

sagaMiddleware.run(rootSaga);
console.log("connecting...");
const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .withUrl(process.env.REACT_APP_API_URL + "/hubs/repoSyncJobUpdates")
    .build();

connection.on("pushUpdate", (itemStatus: { [index: string]: string }, jobStatus: string) => {
    // todo --------------------------------------------
    //      make a jobNotificationReducer
    //      dispatch an action on every call here.
    //      make a component above app to use a snackbar
    //      that component can useSelector for individually diffable pieces of state. on every change it will rerender and display newest message
});

connection
    .start()
    .then(() => {
        console.log("connected");
    })
    .catch((error: Error) => console.log("error: ", error));

// todo move out
function getToken() {
    return store.getState().auth.token;
}

// todo move out
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// todo move out
const tokenInsertRequestHandler = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// todo move out
const tokenExpiredResponseHandler = axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401: {
                    // todo set state for a login prompt
                    store.dispatch(logoutLoadingAction());
                    navigate(Routes.login).then(() => null);
                    break;
                }
                case 403: {
                    // todo set state for a login prompt
                    store.dispatch(logoutLoadingAction());
                    navigate(Routes.login).then(() => null);
                    break;
                }
                default:
                    break;
            }
        }

        return Promise.reject(error);
    }
);
