import axios from "axios";
import { IApiResponse } from "../../general/types/IApiResponse";

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
}

export interface IProjectPicture {
    Description: string;
    Link: string;
}
