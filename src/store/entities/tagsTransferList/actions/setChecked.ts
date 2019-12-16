import { IFacade } from "../../projects/ui/selectors";

export const SET_CHECKED = "SET_CHECKED";

export interface ISetChecked {
    type: typeof SET_CHECKED;
    payload: IFacade[];
}

export const setCheckedAction = (elements: IFacade[]): ISetChecked => ({
    payload: elements,
    type: SET_CHECKED,
});
