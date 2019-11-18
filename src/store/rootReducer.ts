import { combineReducers } from "redux-starter-kit";
import { authReducer, IAuthState } from "./entities/auth/actions/authReducer";
import { blogPostsReducer, IBlogPostState } from "./entities/blogPost/actions/blogPostReducer";
import {
    IPinnedRepositoriesState,
    pinnedRepositoriesReducer,
} from "./entities/pinnedRepositories/actions/pinnedRepositoriesReducer";
import { IProjectsState, projectsReducer } from "./entities/projects/ui/actions/projectsReducer";
import { ITagsState, tagsReducer } from "./entities/tags/actions/tagsReducer";
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
