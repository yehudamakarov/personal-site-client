import { IApplicationState } from "../../../../rootReducer";
import { ProjectDataHelper } from "../../helper";
import { IProject } from "../actions/api";

export const projectIsEditableSelector = (project?: IProject) => (
    state: IApplicationState,
) => {
    if (project) {
        return state.projects.projectsUi.singleIsEditing[
            project.githubRepoDatabaseId
            ];
    } else {
        return false;
    }
};

export const editableProjectDeploymentUrlSelector = (project?: IProject) => (
    state: IApplicationState,
) => {
    const projectId = ProjectDataHelper.getProjectId(project);
    if (projectId) {
        const editableProject =
            state.projects.projectsUi.editableProjects[projectId];
        return editableProject ? editableProject.deploymentUrl : undefined;
    }
};

export const editableProjectSelector = (
    projectId: IProject["githubRepoDatabaseId"] | undefined,
) => (state: IApplicationState) => {
    if (projectId) {
        return state.projects.projectsUi.editableProjects[projectId];
    }
};
