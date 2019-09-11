import { IProjectHighlight } from "./IProjectHighlight";
import { IProjectPicture } from "./IProjectPicture";
export interface IProject {
    githubRepoDatabaseId: string;
    projectName: string;
    projectDescription: boolean;
    ProjectHighlights: IProjectHighlight[];
    ProjectPictures: IProjectPicture[];
}
