import { IFacade } from "../../projects/ui/selectors";

export const SET_RIGHT_PROJECTS = "SET_RIGHT_PROJECTS";

export interface ISetRightProjects {
    type: typeof SET_RIGHT_PROJECTS;
    payload: IFacade[];
}

export const setRightProjectsAction = (projects: IFacade[]): ISetRightProjects => ({
    payload: projects,
    type: SET_RIGHT_PROJECTS,
});
