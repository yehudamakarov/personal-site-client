import { combineReducers } from "redux-starter-kit";
import uiReducer from "./uiReducer";


const rootReducer = combineReducers({
    ui: uiReducer
})

export default rootReducer;