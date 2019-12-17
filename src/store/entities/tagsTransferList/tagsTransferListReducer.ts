import { IBlogPost } from "../blogPost/actions/api";
import { IProject } from "../projects/ui/actions/api";
import { IFacade } from "../projects/ui/selectors";
import { GetTransferListFacadesActionTypes } from "./actions/getTransferListFacades";
import { ISetChecked } from "./actions/setChecked";
import { ISetLeft } from "./actions/setLeft";
import { ISetRight } from "./actions/setRight";

export interface ITagsTransferListState {
    allIsLoading: boolean;
    allIsError: boolean;
    checked: IFacade[];
    right: IFacade[];
    left: IFacade[];
    facadeIds: Array<IProject["githubRepoDatabaseId"] | IBlogPost["id"]>;
    facadeItems: { [index: string]: IFacade };
}

const INITIAL_STATE: ITagsTransferListState = {
    allIsError: false,
    allIsLoading: false,
    checked: [],
    facadeIds: [],
    facadeItems: {},
    left: [],
    right: [],
};

type TagsTransferListActionTypes = ISetChecked | ISetRight | ISetLeft | GetTransferListFacadesActionTypes;

export const tagsTransferListReducer = (
    state: ITagsTransferListState = INITIAL_STATE,
    action: TagsTransferListActionTypes
): ITagsTransferListState => {
    switch (action.type) {
        case "GET_TRANSFER_LIST_FACADES_LOADING": {
            return { ...state, allIsLoading: true };
        }

        case "GET_TRANSFER_LIST_FACADES_SUCCESS": {
            const facadeIds = action.payload.map((facade) => facade.id);
            const facadeItems = action.payload.reduce((facadeItemsObject, facade) => {
                facadeItemsObject[facade.id] = facade;
                return facadeItemsObject;
            }, {} as ITagsTransferListState["facadeItems"]);
            return { ...state, allIsLoading: false, facadeIds, facadeItems, allIsError: false };
        }
        case "GET_TRANSFER_LIST_FACADES_ERROR": {
            return { ...state, allIsLoading: false, allIsError: true };
        }
        case "SET_CHECKED": {
            return { ...state, checked: action.payload };
        }
        case "SET_RIGHT": {
            return { ...state, right: action.payload };
        }
        case "SET_LEFT": {
            return { ...state, left: action.payload };
        }
        default: {
            return state;
        }
    }
};
