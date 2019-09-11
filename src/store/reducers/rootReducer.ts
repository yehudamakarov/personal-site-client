import { combineReducers } from "redux-starter-kit";
import {
    IPinnedRepositoriesState,
    pinnedRepositoriesReducer,
} from "./pinnedRepositoriesReducer";
import { IProjectsState, projectsReducer } from "./projectsReducer";
import { IUiState, uiReducer } from "./uiReducer";

export interface IApplicationState {
    pinnedRepositories: IPinnedRepositoriesState;
    projects: IProjectsState;
    ui: IUiState;
}

export const rootReducer = combineReducers<IApplicationState>({
    pinnedRepositories: pinnedRepositoriesReducer,
    projects: projectsReducer,
    ui: uiReducer,
});
