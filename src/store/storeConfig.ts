import { navigate } from "@reach/router";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { throttle } from "lodash";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { IAuthState } from "./actions/auth/authReducer";
import { logoutLoadingAction } from "./actions/auth/logout/actions";
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
        console.log("loading: ", state);
        return state;
    } catch (e) {
        return undefined;
    }
}

function saveState(savableState: { auth: IAuthState; ui: IUiState }) {
    try {
        console.log("saving: ", savableState);
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
            auth: store.getState().auth,
            ui: {
                ...INITIAL_STATE,
                filter: { ...store.getState().ui.filter, searchText: "" },
            },
        });
    }, 1000)
);

sagaMiddleware.run(rootSaga);

function getToken() {
    return store.getState().auth.token;
}

const requestInterceptorId = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

const responseInterceptorId = axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                // todo set state for a login prompt
                store.dispatch(logoutLoadingAction());
                navigate(Routes.login).then(() => null);
                break;
            case 403:
                // todo set state for a login prompt
                store.dispatch(logoutLoadingAction());
                navigate(Routes.login).then(() => null);
                break;
        }

        return Promise.reject(error);
    }
);
