import { combineReducers } from "redux-starter-kit";
import {
    IPinnedRepositoriesState,
    PinnedRepositoriesReducer,
} from "./pinnedRepositories/pinnedRepositoriesReducer";
import { IUiState, uiReducer } from "./ui/uiReducer";

export interface IApplicationState {
    pinnedRepositories: IPinnedRepositoriesState;
    ui: IUiState;
}

export const rootReducer = combineReducers<IApplicationState>({
    pinnedRepositories: PinnedRepositoriesReducer,
    ui: uiReducer,
});
