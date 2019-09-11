import { combineReducers } from "redux-starter-kit";
import {
    IPinnedRepositoriesState,
    PinnedRepositoriesReducer,
} from "./pinnedRepositories/pinnedRepositoriesReducer";
import { IUiState, uiReducer } from "./ui/uiReducer";

export interface IApplicationState {
    ui: IUiState;
    PinnedRepositories: IPinnedRepositoriesState;
}

export const rootReducer = combineReducers({
    PinnedRepositories: PinnedRepositoriesReducer,
    ui: uiReducer,
});
