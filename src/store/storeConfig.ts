import axios, { AxiosRequestConfig } from "axios";
import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

function getToken() {
    return store.getState().auth.token;
}

const interceptorId = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.headers.Authorization = `Bearer: ${getToken()}`;
        debugger;
        return config;
    },
);
