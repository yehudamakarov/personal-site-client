import { combineReducers } from "redux-starter-kit";
import { pinnedRepositoriesReducer } from "./pinnedRepositories/pinnedRepositoriesReducer";
import { IPinnedRepositoriesState } from "./pinnedRepositories/types/IPinnedRepositoriesState";
import { projectsReducer } from "./projects/projectsReducer";
import { IProjectsState } from "./projects/types/IProjectsState";
import { IUiState } from "./ui/IUiState";
import { uiReducer } from "./ui/uiReducer";

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
