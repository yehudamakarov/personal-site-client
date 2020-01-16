import { IBlogPost } from "../blogPost/actions/api";
import { IProject } from "../projects/ui/actions/api";
import { IFacade } from "../projects/ui/selectors";
import {
    CLOSE_TAG_MAP_SAVE_DIALOG,
    GET_TRANSFER_LIST_FACADES_ERROR,
    GET_TRANSFER_LIST_FACADES_LOADING,
    GET_TRANSFER_LIST_FACADES_SUCCESS,
    OPEN_TAG_MAP_SAVE_DIALOG,
    SET_CHECKED,
    SET_INITIALLY_MAPPED,
    SET_LEFT,
    SET_RIGHT,
    TagsTransferListActionTypes,
} from "./actions/tagsTransferListActions";

export type FacadeIds = TransferListFacadeId[];
export type TransferListFacadeId = IProject["githubRepoDatabaseId"] | IBlogPost["id"];

export class TagsTransferListState {
    public saveDialogIsOpen: boolean = false;
    public allIsLoading: boolean = false;
    public allIsError: boolean = false;
    public checked: FacadeIds = [];
    public initialLeft: FacadeIds = [];
    public initialRight: FacadeIds = [];
    public right: FacadeIds = [];
    public left: FacadeIds = [];
    public facadeIds: FacadeIds = [];
    public facadeItems: { [index: string]: IFacade } = {};
}

const INITIAL_STATE = new TagsTransferListState();

export const tagsTransferListReducer = (
    state: TagsTransferListState = INITIAL_STATE,
    action: TagsTransferListActionTypes,
): TagsTransferListState => {
    switch (action.type) {
        // =============================================================================== //
        case GET_TRANSFER_LIST_FACADES_LOADING: {
            return { ...state, allIsLoading: true };
        }
        // =============================================================================== //
        case GET_TRANSFER_LIST_FACADES_SUCCESS: {
            const facadeIds = action.payload.map((facade) => facade.id);
            const facadeItems = action.payload.reduce((facadeItemsObject, facade) => {
                facadeItemsObject[facade.id] = facade;
                return facadeItemsObject;
            }, {} as TagsTransferListState["facadeItems"]);
            return { ...state, allIsLoading: false, facadeIds, facadeItems, allIsError: false };
        }
        // =============================================================================== //
        case GET_TRANSFER_LIST_FACADES_ERROR: {
            return { ...state, allIsLoading: false, allIsError: true };
        }
        // =============================================================================== //
        case SET_INITIALLY_MAPPED: {
            return { ...state, initialLeft: action.payload.left, initialRight: action.payload.right };
        }
        // =============================================================================== //
        case SET_CHECKED: {
            return { ...state, checked: action.payload };
        }
        // =============================================================================== //
        case SET_RIGHT: {
            return { ...state, right: action.payload };
        }
        // =============================================================================== //
        case SET_LEFT: {
            return { ...state, left: action.payload };
        }
        // =============================================================================== //
        case OPEN_TAG_MAP_SAVE_DIALOG: {
            return { ...state, saveDialogIsOpen: true };
        }
        // =============================================================================== //
        case CLOSE_TAG_MAP_SAVE_DIALOG: {
            return { ...state, saveDialogIsOpen: false };
        }
        // =============================================================================== //
        default: {
            return state;
        }
    }
};
