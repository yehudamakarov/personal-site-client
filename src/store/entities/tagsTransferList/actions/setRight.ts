import { IFacade } from "../../projects/ui/selectors";

export const SET_RIGHT = "SET_RIGHT";

export interface ISetRight {
    type: typeof SET_RIGHT;
    payload: IFacade[];
}

export const setRightAction = (elements: IFacade[]): ISetRight => ({
    payload: elements,
    type: SET_RIGHT,
});
