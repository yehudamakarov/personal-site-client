import { GET_PROJECT_BY_NAME_ERROR } from "../index";
export interface IGetProjectByNameErrorAction {
    type: typeof GET_PROJECT_BY_NAME_ERROR;
    payload?: string;
}
