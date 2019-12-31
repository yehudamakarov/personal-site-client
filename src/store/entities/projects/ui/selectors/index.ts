import { IApplicationState } from "../../../../rootReducer";
import { IBlogPost } from "../../../blogPost/actions/api";
import { TransferListFacadeId } from "../../../tagsTransferList/tagsTransferListReducer";
import { ProjectDataHelper } from "../../helper";
import { IProject } from "../actions/api";

export const projectIsEditableSelector = (project?: IProject) => (state: IApplicationState) => {
    if (project) {
        return state.projects.projectsUi.singleIsEditing[project.githubRepoDatabaseId];
    } else {
        return false;
    }
};

export const editableProjectDeploymentUrlSelector = (project?: IProject) => (state: IApplicationState) => {
    const projectId = ProjectDataHelper.getProjectId(project);
    if (projectId) {
        const editableProject = editableProjectSelector(projectId)(state);
        const url = editableProject ? editableProject.deploymentUrl : undefined;
        return url ? url : "";
    }
};

export const editableProjectTitleSelector = (project?: IProject) => (state: IApplicationState) => {
    const projectId = ProjectDataHelper.getProjectId(project);
    if (projectId) {
        const editableProject = editableProjectSelector(projectId)(state);
        return editableProject ? editableProject.projectTitle : undefined;
    }
};

export const editableProjectSelector = (projectId: IProject["githubRepoDatabaseId"] | undefined) => (
    state: IApplicationState,
) => {
    if (projectId) {
        return state.projects.projectsUi.editableProjects[projectId];
    }
};

export enum FacadeType {
    Project,
    BlogPost,
}

export interface IFacade {
    id: TransferListFacadeId;
    link: string;
    title: IProject["projectTitle"] | IBlogPost["title"];
    tagIds: IProject["tagIds"] | IBlogPost["tagIds"];
    type: FacadeType;
}
