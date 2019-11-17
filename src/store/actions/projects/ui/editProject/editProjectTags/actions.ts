import { IProject } from "../../../api";
/* -------------------------------------------------------------------------- */
/*                          editProjectTagIdsAction                    */
/* -------------------------------------------------------------------------- */

export const EDIT_PROJECT_TAGS_IDS = "EDIT_PROJECT_TAGS_IDS";

export interface IEditProjectTagIdsAction {
    type: typeof EDIT_PROJECT_TAGS_IDS;
    payload: {
        projectTagIds: IProject["tagIds"];
        projectId: IProject["githubRepoDatabaseId"];
    };
}

export const editProjectTagIdsAction = (
    projectTagIds: IProject["tagIds"],
    projectId: IProject["githubRepoDatabaseId"],
): IEditProjectTagIdsAction => ({
    payload: { projectTagIds, projectId },
    type: EDIT_PROJECT_TAGS_IDS,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type EditProjectTagIdsActionTypes = IEditProjectTagIdsAction;
