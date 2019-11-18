import { IProject } from "../../api";
/* -------------------------------------------------------------------------- */
/*                          editProjectDeploymentUrlAction                    */
/* -------------------------------------------------------------------------- */

export const EDIT_PROJECT_DEPLOYMENT_URL = "EDIT_PROJECT_DEPLOYMENT_URL";

export interface IEditProjectDeploymentUrlAction {
    type: typeof EDIT_PROJECT_DEPLOYMENT_URL;
    payload: {
        projectDeploymentUrl: IProject["deploymentUrl"];
        projectId: IProject["githubRepoDatabaseId"];
    };
}

export const editProjectDeploymentUrlAction = (
    projectDeploymentUrl: IProject["deploymentUrl"],
    projectId: IProject["githubRepoDatabaseId"],
): IEditProjectDeploymentUrlAction => ({
    payload: { projectDeploymentUrl, projectId },
    type: EDIT_PROJECT_DEPLOYMENT_URL,
});

/* -------------------------------------------------------------------------- */
/*                                Export Types                                */
/* -------------------------------------------------------------------------- */

export type EditProjectDeploymentUrlActionTypes = IEditProjectDeploymentUrlAction;
