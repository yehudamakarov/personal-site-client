import { combineReducers } from "redux-starter-kit";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer
})
