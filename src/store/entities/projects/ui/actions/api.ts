import axios, { AxiosResponse } from "axios";
import { IResult } from "../../../../baseTypes/IResult";

export type IProjectResponse = IResult<IProject>;
export type IProjectsResponse = IResult<IProject[]>;

export const projectsApi = {
    getProjectById: (projectId: string) =>
        axios.get<IProjectResponse>(`/projects/projectByName`, {
            params: { projectId },
        }),
    getProjectByName: (projectName: string) =>
        axios.get<IProjectResponse>(`/projects/projectByName`, {
            params: { projectName },
        }),
    getProjects: (): Promise<AxiosResponse<IProjectsResponse>> => {
        return axios.get<IProjectsResponse>(`/projects/allProjects`);
    },
    updateProject: (project: IProject) => axios.post(`/projects/updateProject`, project),
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
    tagIds: string[];
    isPinnedRepo: boolean;
    projectHighlights: IProjectHighlight[];
    projectPictures: IProjectPicture[];
    slug: string;
    deploymentUrl: string | null;
}

export interface IProjectPicture {
    Description: string;
    Link: string;
}
