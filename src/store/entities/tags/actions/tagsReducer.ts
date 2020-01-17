import { IBaseCollectionUiState } from "../../../baseTypes/IBaseCollectionUiState";
import {
    HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
    IHandleMapTagJobStatusUpdateAction,
} from "../../../signalR/actions/JobStatusUpdateActions";
import { Tag } from "./api";
import { GET_TAGS_ERROR, GET_TAGS_LOADING, GET_TAGS_SUCCESS, GetTagsActionTypes } from "./getTags/actions";

export interface ITagsState {
    tagsData: Tag[];
    tagsUi: ITagsUi;
}

type ITagsUi = IBaseCollectionUiState;

const INITIAL_STATE: ITagsState = {
    tagsData: [],
    tagsUi: {
        allIsError: false,
        allIsLoading: false,
        singleIsError: {},
        singleIsLoading: {},
    },
};

type TagsActionTypes = GetTagsActionTypes | IHandleMapTagJobStatusUpdateAction;

export const tagsReducer = (state = INITIAL_STATE, action: TagsActionTypes): ITagsState => {
    switch (action.type) {
        case HANDLE_MAP_TAG_JOB_STATUS_UPDATE: {
            const tagResult = action.payload.item;
            if (tagResult) {
                return {
                    ...state,
                    tagsData: state.tagsData.map((tag) => {
                        if (tag.tagId !== tagResult.data.tagId) {
                            return tag;
                        } else {
                            return { ...tag, articleCount: tagResult.data.articleCount };
                        }
                    }),
                };
            }
        }
        case GET_TAGS_LOADING: {
            return {
                ...state,
                tagsUi: {
                    ...state.tagsUi,
                    allIsError: false,
                    allIsLoading: true,
                },
            };
        }
        case GET_TAGS_SUCCESS:
            return {
                tagsData: action.payload,
                tagsUi: {
                    ...state.tagsUi,
                    allIsError: false,
                    allIsLoading: false,
                },
            };
        case GET_TAGS_ERROR:
            return {
                ...state,
                tagsUi: {
                    ...state.tagsUi,
                    allIsError: true,
                    allIsLoading: false,
                },
            };
        default:
            return state;
    }
};
