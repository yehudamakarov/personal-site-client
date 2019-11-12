import { IProject } from "../../api";

/* -------------------------------------------------------------------------- */
/*                          editProjectAction                          */
/* -------------------------------------------------------------------------- */

export const EDIT_PROJECT = "EDIT_PROJECT";

export interface IEditProjectAction {
    type: typeof EDIT_PROJECT;
    payload: IProject;
}

export const editProjectAction = (project: IProject): IEditProjectAction => ({
    payload: project,
    type: EDIT_PROJECT,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type EditProjectActionTypes = IEditProjectAction;
