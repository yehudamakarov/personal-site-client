import { combineReducers } from "redux-starter-kit";
import { uiReducer, UiState } from "./ui/uiReducer";
import { projectsReducer, ProjectsState } from "./projects/projectsReducer";

export interface ApplicationState {
    ui: UiState,
    projects: ProjectsState
}


export const rootReducer = combineReducers({
    ui: uiReducer,
    projects: projectsReducer
})
