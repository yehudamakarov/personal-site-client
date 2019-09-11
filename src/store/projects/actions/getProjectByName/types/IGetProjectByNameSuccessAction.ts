import { GET_PROJECT_BY_NAME_SUCCESS } from "../index";
export interface IGetProjectByNameSuccessAction {
    type: typeof GET_PROJECT_BY_NAME_SUCCESS;
    payload?: string;
}
