import { combineReducers } from "redux-starter-kit";
import { authReducer, IAuthState } from "./actions/auth/authReducer";
import { blogPostsReducer, IBlogPostState } from "./actions/blogPost/blogPostReducer";
import {
    IPinnedRepositoriesState,
    pinnedRepositoriesReducer,
} from "./actions/pinnedRepositories/pinnedRepositoriesReducer";
import { IProjectsState, projectsReducer } from "./actions/projects/projectsReducer";
import { ITagsState, tagsReducer } from "./actions/tags/tagsReducer";
import { IUiState } from "./ui/IUiState";
import { uiReducer } from "./ui/uiReducer";

export interface IApplicationState {
    pinnedRepositories: IPinnedRepositoriesState;
    projects: IProjectsState;
    ui: IUiState;
    blogPosts: IBlogPostState;
    tags: ITagsState;
    auth: IAuthState;
}

export const rootReducer = combineReducers<IApplicationState>({
    auth: authReducer,
    blogPosts: blogPostsReducer,
    pinnedRepositories: pinnedRepositoriesReducer,
    projects: projectsReducer,
    tags: tagsReducer,
    ui: uiReducer,
});
