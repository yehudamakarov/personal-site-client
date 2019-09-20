import { GET_PROJECTS_ERROR } from "../index";
export interface IGetProjectsErrorAction {
    type: typeof GET_PROJECTS_ERROR;
    payload: Error;
}
