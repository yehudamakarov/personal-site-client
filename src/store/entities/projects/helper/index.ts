import { IProject } from "../ui/actions/api";

export class ProjectDataHelper {
    public static getProjectGithubUrl = (project?: IProject) => {
        if (project && project.githubUrl) {
            return project.githubUrl;
        } else {
            return undefined;
        }
    };

    public static getProjectDeploymentUrl = (project?: IProject) => {
        if (project && project.deploymentUrl) {
            return project.deploymentUrl;
        } else {
            return undefined;
        }
    };

    public static getProjectTitle = (project?: IProject) => {
        return project ? project.projectTitle : undefined;
    };

    public static getProjectId = (project?: IProject) => {
        return project ? project.githubRepoDatabaseId : undefined;
    };
}
