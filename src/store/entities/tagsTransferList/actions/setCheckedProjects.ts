import { IFacade } from "../../projects/ui/selectors";

export const SET_CHECKED_PROJECTS = "SET_CHECKED_PROJECTS";

export interface ISetCheckedProjects {
    type: typeof SET_CHECKED_PROJECTS;
    payload: IFacade[];
}

export const setCheckedProjectsAction = (projects: IFacade[]): ISetCheckedProjects => ({
    payload: projects,
    type: SET_CHECKED_PROJECTS,
});
