import { IApiResponse } from "../../../../general/types/IApiResponse";
import { IProject } from "../../../types";
import { GET_PROJECT_BY_NAME_SUCCESS } from "../index";
export interface IGetProjectByNameSuccessAction {
    type: typeof GET_PROJECT_BY_NAME_SUCCESS;
    payload: IApiResponse<IProject>;
}
