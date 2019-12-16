import { IFacade } from "../projects/ui/selectors";
import { ISetChecked } from "./actions/setChecked";
import { ISetLeft } from "./actions/setLeft";
import { ISetRight } from "./actions/setRight";

export interface ITagsTransferListState {
    checked: IFacade[];
    right: IFacade[];
    left: IFacade[];
}

const INITIAL_STATE: ITagsTransferListState = {
    checked: [],
    left: [],
    right: [],
};

type TagsTransferListActionTypes = ISetChecked | ISetRight | ISetLeft;

export const tagsTransferListReducer = (
    state: ITagsTransferListState = INITIAL_STATE,
    action: TagsTransferListActionTypes
): ITagsTransferListState => {
    switch (action.type) {
        case "SET_CHECKED":
            return { ...state, checked: action.payload };
        case "SET_RIGHT":
            return { ...state, right: action.payload };
        case "SET_LEFT":
            return { ...state, left: action.payload };
        default:
            return state;
    }
};
