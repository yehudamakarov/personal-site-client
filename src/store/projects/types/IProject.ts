import { IProjectHighlight } from "./IProjectHighlight";
import { IProjectPicture } from "./IProjectPicture";
export interface IProject {
    githubRepoDatabaseId: string;
    projectName: string;
    projectTitle: string;
    projectDescription: string;
    projectOverview: string;
    tagIds: string[];
    isPinnedRepo: boolean;
    projectHighlights: IProjectHighlight[];
    projectPictures: IProjectPicture[];
}
