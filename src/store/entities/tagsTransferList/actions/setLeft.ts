import { IFacade } from "../../projects/ui/selectors";

export const SET_LEFT = "SET_LEFT";

export interface ISetLeft {
    type: typeof SET_LEFT;
    payload: IFacade[];
}

export const setLeftAction = (elements: IFacade[]): ISetLeft => ({
    payload: elements,
    type: SET_LEFT,
});
