import axios from "axios";
import { IApiResponse } from "../../../baseTypes/IApiResponse";

export interface ITag {
    articleCount?: number;
    tagId: string;
}

export type ITagsResponse = IApiResponse<ITag[]>;

export const tagsApi = {
    getTags: () => {
        return axios.get<ITagsResponse>(`/tags/allTags`);
    },
};
