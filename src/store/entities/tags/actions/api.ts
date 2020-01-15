import axios from "axios";
import { IResult } from "../../../baseTypes/IResult";

export interface ITag {
    articleCount?: number;
    tagId: string;
}

export type ITagsResponse = IResult<ITag[]>;

export const tagsApi = {
    getTags: () => {
        return axios.get<ITagsResponse>(`/tags/allTags`);
    },
};
