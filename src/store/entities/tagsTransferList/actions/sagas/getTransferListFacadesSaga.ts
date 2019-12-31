import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { blogPostsApi, IBlogPostsResponse } from "../../../blogPost/actions/api";
import { IProjectsResponse, projectsApi } from "../../../projects/ui/actions/api";
import { FacadeType, IFacade } from "../../../projects/ui/selectors";
import {
    GET_TRANSFER_LIST_FACADES_LOADING,
    getTransferListFacadesErrorAction,
    getTransferListFacadesSuccessAction,
    IGetTransferListFacadesLoadingAction,
} from "../getTransferListFacades";
import { setInitiallyMappedAction } from "../setInitiallyMapped";
import { setLeftAction } from "../setLeft";
import { setRightAction } from "../setRight";

function* getTransferListFacades(action: IGetTransferListFacadesLoadingAction) {
    try {
        debugger;
        const currentTagId = action.payload;
        const [projectsResponse, blogPostsResponse]: [
            AxiosResponse<IProjectsResponse>,
            AxiosResponse<IBlogPostsResponse>
        ] = yield all([call(projectsApi.getProjects), call(blogPostsApi.getBlogPosts)]);

        const projectFacades: IFacade[] = projectsResponse.data.data.map((value) => ({
            id: value.githubRepoDatabaseId,
            link: `/projects/${value.slug}`,
            tagIds: value.tagIds,
            title: value.projectTitle,
            type: FacadeType.Project,
        }));
        const blogPostFacades: IFacade[] = blogPostsResponse.data.data.map((value) => ({
            id: value.id,
            link: `/blogPosts/${value.slug}`,
            tagIds: value.tagIds,
            title: value.title,
            type: FacadeType.BlogPost,
        }));
        const facades = projectFacades.concat(blogPostFacades);
        yield put(getTransferListFacadesSuccessAction(facades));

        const availableToMapToTag = facades
            .filter((facade) => facade.tagIds === null || facade.tagIds.every((tagId) => tagId !== currentTagId))
            .map((facade) => facade.id);
        yield put(setRightAction(availableToMapToTag));

        const mappedToTag = facades
            .filter((facade) => facade.tagIds && facade.tagIds.some((tagId) => tagId === currentTagId))
            .map((facade) => facade.id);
        yield put(setLeftAction(mappedToTag));
        yield put(setInitiallyMappedAction(mappedToTag));
    } catch (error) {
        yield put(getTransferListFacadesErrorAction(JSON.stringify(error)));
    }
}

export function* watchGetTransferListFacades() {
    yield takeEvery(GET_TRANSFER_LIST_FACADES_LOADING, getTransferListFacades);
}
