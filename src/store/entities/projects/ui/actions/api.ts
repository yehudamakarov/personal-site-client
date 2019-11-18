import axios from "axios";
import { IApiResponse } from "../../../../baseTypes/IApiResponse";

export type IProjectResponse = IApiResponse<IProject>;
export type IProjectsResponse = IApiResponse<IProject[]>;

export const projectsApi = {
    getProjectById: (projectId: string) =>
        axios.get<IProjectResponse>(
            `${process.env.REACT_APP_API_URL}projects/projectByName`,
            { params: { projectId } }
        ),
    getProjectByName: (projectName: string) =>
        axios.get<IProjectResponse>(
            `${process.env.REACT_APP_API_URL}projects/projectByName`,
            { params: { projectName } }
        ),
    getProjects: () => {
        return axios.get<IProjectsResponse>(
            `${process.env.REACT_APP_API_URL}projects/allProjects`
        );
    },
    updateProject: (project: IProject) =>
        axios.post(
            `${process.env.REACT_APP_API_URL}projects/updateProject`,
            project,
        ),
};

export interface IProjectHighlight {
    HighlightDescription: string;
    HighlightLink: string;
}

export interface IProject {
    githubRepoDatabaseId: string;
    projectName: string;
    projectTitle: string;
    projectDescription: string;
    projectOverview: string;
    githubUrl: string | null;
    tagIds: string[] | null;
    isPinnedRepo: boolean;
    projectHighlights: IProjectHighlight[] | null;
    projectPictures: IProjectPicture[] | null;
    slug: string;
    deploymentUrl: string | null;
}

export interface IProjectPicture {
    Description: string;
    Link: string;
}
