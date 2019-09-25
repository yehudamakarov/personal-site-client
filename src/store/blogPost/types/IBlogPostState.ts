import { IBlogPost } from ".";
import { IBaseCollectionUiState } from "../../general/types/IBaseCollectionUiState";

export interface IBlogPostState {
    blogPostData: IBlogPost[];
    blogPostUi: IBlogPostUi;
}

type IBlogPostUi = IBaseCollectionUiState;
