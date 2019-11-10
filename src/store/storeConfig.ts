import axios, { AxiosRequestConfig } from "axios";
import { throttle } from "lodash";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { IAuthState } from "./actions/auth/authReducer";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { IUiState } from "./ui/IUiState";
import { INITIAL_STATE } from "./ui/uiReducer";

const sagaMiddleware = createSagaMiddleware();

function loadState() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
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
            ui: { ...INITIAL_STATE, filter: store.getState().ui.filter },
        });
    }, 1000),
);

sagaMiddleware.run(rootSaga);

function getToken() {
    return store.getState().auth.token;
}

const interceptorId = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token !== null) {
            config.headers.Authorization = `Bearer: ${token}`;
        }
        return config;
    }
);
