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

interface IApiCache {
    [index: string]: { lastFetchAt: number; currentData: any };
}

const cache: IApiCache = {};

const apiCacheRequestHandler = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // how do i not send request, and return data of my choice
    return config;
});

const apiCacheResponseHandler = axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config.url) {
            cache[response.config.url] = { currentData: response, lastFetchAt: Date.now() };
        }
        return response;
    },
    (error: AxiosError) => error,
);

const tokenInsertRequestHandler = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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
