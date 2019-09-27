import { combineReducers } from "redux-starter-kit";
import {
    blogPostsReducer,
    IBlogPostState,
} from "./actions/blogPost/blogPostReducer";
import {
    IPinnedRepositoriesState,
    pinnedRepositoriesReducer,
} from "./actions/pinnedRepositories/pinnedRepositoriesReducer";
import {
    IProjectsState,
    projectsReducer,
} from "./actions/projects/projectsReducer";
import { IUiState } from "./ui/IUiState";
import { uiReducer } from "./ui/uiReducer";

export interface IApplicationState {
    pinnedRepositories: IPinnedRepositoriesState;
    projects: IProjectsState;
    ui: IUiState;
    blogPosts: IBlogPostState;
}

export const rootReducer = combineReducers<IApplicationState>({
    blogPosts: blogPostsReducer,
    pinnedRepositories: pinnedRepositoriesReducer,
    projects: projectsReducer,
    ui: uiReducer,
});
