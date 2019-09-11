import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { rootReducer } from "./reducers/rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);
