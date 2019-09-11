import { IProject } from "../../../types";
import { GET_PROJECTS_SUCCESS } from "../index";
export interface IGetProjectsSuccessAction {
    type: typeof GET_PROJECTS_SUCCESS;
    payload: IProject[];
}
