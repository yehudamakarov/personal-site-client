import { IProjectHighlight } from "./IProjectHighlight";
import { IProjectPicture } from "./IProjectPicture";
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
