import { ITagRenameJobDoneAction, TAG_RENAME_JOB_DONE } from "../../../../logic/dashboard/tags/rename";
import { IBaseCollectionUiState } from "../../../baseTypes/IBaseCollectionUiState";
import {
    HANDLE_DELETE_TAG_JOB_STATUS_UPDATE,
    HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
    IHandleDeleteTagJobStatusUpdateAction,
    IHandleMapTagJobStatusUpdateAction,
} from "../../../signalR/actions/JobStatusUpdateActions";
import { JobStage } from "../../../signalR/init";
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

type TagsActionTypes =
    | GetTagsActionTypes
    | IHandleMapTagJobStatusUpdateAction
    | ITagRenameJobDoneAction
    | IHandleDeleteTagJobStatusUpdateAction;

export const tagsReducer = (state = INITIAL_STATE, action: TagsActionTypes): ITagsState => {
    switch (action.type) {
        case HANDLE_DELETE_TAG_JOB_STATUS_UPDATE: {
            const { payload } = action;
            if (payload.jobStage === JobStage.Done) {
                const besidesDeleted = state.tagsData.filter((tag) => {
                    return tag.tagId !== payload.item;
                });
                return { ...state, tagsData: [...besidesDeleted] };
            }
            return state;
        }

        case TAG_RENAME_JOB_DONE: {
            const besidesNew = state.tagsData.filter((tag) => {
                return tag.tagId !== action.payload.uniqueKey;
            });
            const newTag = action.payload?.item?.data;
            if (newTag) {
                return { ...state, tagsData: [newTag, ...besidesNew] };
            } else {
                return { ...state };
            }
        }
        case HANDLE_MAP_TAG_JOB_STATUS_UPDATE: {
            // replaces the old tag with the new tag from the completed job
            const tagResult = action.payload.item;
            const jobStage = action.payload.jobStage;
            if (tagResult && jobStage === JobStage.Done) {
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
            } else {
                return state;
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
