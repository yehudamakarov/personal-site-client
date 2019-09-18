import { IProjectHighlight } from "./IProjectHighlight";
import { IProjectPicture } from "./IProjectPicture";
export interface IProject {
    githubRepoDatabaseId: string;
    projectName: string;
    projectDescription: string;
    ProjectHighlights: IProjectHighlight[];
    ProjectPictures: IProjectPicture[];
}
