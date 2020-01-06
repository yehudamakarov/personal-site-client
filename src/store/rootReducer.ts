import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, IAuthState } from "./entities/auth/actions/authReducer";
import { blogPostsReducer, IBlogPostState } from "./entities/blogPost/actions/blogPostReducer";
import {
    IPinnedRepositoriesState,
    pinnedRepositoriesReducer,
} from "./entities/pinnedRepositories/actions/pinnedRepositoriesReducer";
import { IProjectsState, projectsReducer } from "./entities/projects/ui/actions/projectsReducer";
import { ITagsState, tagsReducer } from "./entities/tags/actions/tagsReducer";
import { ITagsTransferListState, tagsTransferListReducer } from "./entities/tagsTransferList/tagsTransferListReducer";
import { IJobStatusState, jobStatusReducer } from "./signalR/reducer";
import { IUiState } from "./ui/IUiState";
import { uiReducer } from "./ui/uiReducer";

export interface IApplicationState {
    pinnedRepositories: IPinnedRepositoriesState;
    projects: IProjectsState;
    ui: IUiState;
    blogPosts: IBlogPostState;
    tags: ITagsState;
    tagsTransferList: ITagsTransferListState;
    auth: IAuthState;
    jobStatus: IJobStatusState;
}

export const rootReducer = combineReducers<IApplicationState>({
    auth: authReducer,
    blogPosts: blogPostsReducer,
    jobStatus: jobStatusReducer,
    pinnedRepositories: pinnedRepositoriesReducer,
    projects: projectsReducer,
    tags: tagsReducer,
    tagsTransferList: tagsTransferListReducer,
    ui: uiReducer,
});
