import { IBlogPost } from "../blogPost/actions/api";
import { IProject } from "../projects/ui/actions/api";
import { IFacade } from "../projects/ui/selectors";
import {
    GET_TRANSFER_LIST_FACADES_ERROR,
    GET_TRANSFER_LIST_FACADES_LOADING,
    GET_TRANSFER_LIST_FACADES_SUCCESS,
    GetTransferListFacadesActionTypes,
} from "./actions/getTransferListFacades";
import { MAP_TAG_ERROR, MAP_TAG_LOADING, MAP_TAG_SUCCESS, mapTag } from "./actions/mapTag";
import { ISetChecked, SET_CHECKED } from "./actions/setChecked";
import { ISetInitiallyMapped, SET_INITIALLY_MAPPED } from "./actions/setInitiallyMapped";
import { ISetLeft, SET_LEFT } from "./actions/setLeft";
import { ISetRight, SET_RIGHT } from "./actions/setRight";

export type FacadeIds = TransferListFacadeId[];
export type TransferListFacadeId = IProject["githubRepoDatabaseId"] | IBlogPost["id"];

export interface ITagsTransferListState {
    saveIsLoading: boolean;
    saveIsError: boolean;
    saveIsSuccess: boolean;
    allIsLoading: boolean;
    allIsError: boolean;
    checked: FacadeIds;
    initial: FacadeIds;
    right: FacadeIds;
    left: FacadeIds;
    facadeIds: FacadeIds;
    facadeItems: { [index: string]: IFacade };
}

const INITIAL_STATE: ITagsTransferListState = {
    allIsError: false,
    allIsLoading: false,
    checked: [],
    facadeIds: [],
    facadeItems: {},
    initial: [],
    left: [],
    right: [],
    saveIsError: false,
    saveIsLoading: false,
    saveIsSuccess: false,
};

type TagsTransferListActionTypes =
    | ISetChecked
    | ISetRight
    | ISetLeft
    | GetTransferListFacadesActionTypes
    | ISetInitiallyMapped
    | mapTag;

export const tagsTransferListReducer = (
    state: ITagsTransferListState = INITIAL_STATE,
    action: TagsTransferListActionTypes
): ITagsTransferListState => {
    switch (action.type) {
        case MAP_TAG_LOADING: {
            return { ...state, saveIsLoading: true };
        }
        case MAP_TAG_SUCCESS: {
            return { ...state, saveIsLoading: false, saveIsSuccess: true, saveIsError: false };
        }
        case MAP_TAG_ERROR: {
            return { ...state, saveIsLoading: false, saveIsSuccess: false, saveIsError: true };
        }
        case SET_INITIALLY_MAPPED: {
            return { ...state, initial: action.payload };
        }
        case GET_TRANSFER_LIST_FACADES_LOADING: {
            return { ...state, allIsLoading: true };
        }
        case GET_TRANSFER_LIST_FACADES_SUCCESS: {
            const facadeIds = action.payload.map((facade) => facade.id);
            const facadeItems = action.payload.reduce((facadeItemsObject, facade) => {
                facadeItemsObject[facade.id] = facade;
                return facadeItemsObject;
            }, {} as ITagsTransferListState["facadeItems"]);
            return { ...state, allIsLoading: false, facadeIds, facadeItems, allIsError: false };
        }
        case GET_TRANSFER_LIST_FACADES_ERROR: {
            return { ...state, allIsLoading: false, allIsError: true };
        }
        case SET_CHECKED: {
            return { ...state, checked: action.payload };
        }
        case SET_RIGHT: {
            return { ...state, right: action.payload };
        }
        case SET_LEFT: {
            return { ...state, left: action.payload };
        }
        default: {
            return state;
        }
    }
};
