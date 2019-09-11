import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { rootReducer } from "./reducers/rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
