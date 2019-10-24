import { IBaseCollectionUiState } from "../../types/IBaseCollectionUiState";
import { ITag } from "./api";
import {
    GET_TAGS_ERROR,
    GET_TAGS_LOADING,
    GET_TAGS_SUCCESS,
    GetTagsActionTypes,
} from "./getTags/actions";

export interface ITagsState {
    tagsData: ITag[];
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

type TagsActionTypes = GetTagsActionTypes;

export const tagsReduecer = (
    state = INITIAL_STATE,
    action: TagsActionTypes
): ITagsState => {
    switch (action.type) {
        case GET_TAGS_LOADING:
            return {
                ...state,
                tagsUi: {
                    ...state.tagsUi,
                    allIsError: false,
                    allIsLoading: true,
                },
            };
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
