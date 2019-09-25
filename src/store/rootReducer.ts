import { combineReducers } from "redux-starter-kit";
import { blogPostsReducer } from "./blogPost/blogPostReducer";
import { IBlogPostState } from "./blogPost/types";
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
    blogPosts: IBlogPostState;
}

export const rootReducer = combineReducers<IApplicationState>({
    blogPosts: blogPostsReducer,
    pinnedRepositories: pinnedRepositoriesReducer,
    projects: projectsReducer,
    ui: uiReducer,
});
