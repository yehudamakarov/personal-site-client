import { configureStore } from "redux-starter-kit";
import { rootReducer } from "./reducers/rootReducer"

export const store = configureStore({
    reducer: rootReducer
})
