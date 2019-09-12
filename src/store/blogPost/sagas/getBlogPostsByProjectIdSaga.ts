import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
    getBlogPostsByProjectIdErrorAction,
    getBlogPostsByProjectIdSuccessAction,
} from "../actions/getBlogPostsByProjectId";
import { IGetBlogPostsByProjectIdLoadingAction } from "../actions/getBlogPostsByProjectId/types/IGetBlogPostsByProjectIdLoadingAction";
import { blogPostsApi, IBlogPostsResponse } from "../api";

function* getBlogPostsByProjectId(
    action: IGetBlogPostsByProjectIdLoadingAction
) {
    const { payload: projectId } = action;
    try {
        if (!projectId) {
            throw new Error(
                "The project id was undefined. Cannot get the the blog posts for this project."
            );
        }
        const response: AxiosResponse<IBlogPostsResponse> = yield call(
            blogPostsApi.getBlogPostsByProjectId,
            projectId
        );
        const blogPostResponse = response.data;
        yield put(getBlogPostsByProjectIdSuccessAction(blogPostResponse));
    } catch (error) {
        yield put(getBlogPostsByProjectIdErrorAction(error, projectId));
    }
}

export function* watchGetBlogPostsByProjectId() {
    yield takeEvery(
        GET_BLOG_POSTS_BY_PROJECT_ID_LOADING,
        getBlogPostsByProjectId
    );
}
