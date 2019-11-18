import { IProject } from "../../api";
/* -------------------------------------------------------------------------- */
/*                          editProjectTitleAction                    */
/* -------------------------------------------------------------------------- */

export const EDIT_PROJECT_TITLE = "EDIT_PROJECT_TITLE";

export interface IEditProjectTitleAction {
    type: typeof EDIT_PROJECT_TITLE;
    payload: {
        projectTitle: IProject["projectTitle"];
        projectId: IProject["githubRepoDatabaseId"];
    };
}

export const editProjectTitleAction = (
    projectTitle: IProject["projectTitle"],
    projectId: IProject["githubRepoDatabaseId"],
): IEditProjectTitleAction => ({
    payload: { projectTitle, projectId },
    type: EDIT_PROJECT_TITLE,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type EditProjectTitleActionTypes = IEditProjectTitleAction;
