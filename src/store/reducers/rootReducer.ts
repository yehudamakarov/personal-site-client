import { combineReducers } from "redux-starter-kit";
import { IProjectsState, projectsReducer } from "./projects/projectsReducer";
import { IUiState, uiReducer } from "./ui/uiReducer";

export interface IApplicationState {
    ui: IUiState;
    projects: IProjectsState;
}

export const rootReducer = combineReducers({
    projects: projectsReducer,
    ui: uiReducer,
});
