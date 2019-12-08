import { IFacade } from "../../projects/ui/selectors";

export const SET_LEFT_PROJECTS = "SET_LEFT_PROJECTS";

export interface ISetLeftProjects {
    type: typeof SET_LEFT_PROJECTS;
    payload: IFacade[];
}

export const setLeftProjectsAction = (projects: IFacade[]): ISetLeftProjects => ({
    payload: projects,
    type: SET_LEFT_PROJECTS,
});
