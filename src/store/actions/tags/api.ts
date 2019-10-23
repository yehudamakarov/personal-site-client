import axios from "axios";
import { IApiResponse } from "../../types/IApiResponse";

export interface ITag {
    tagId: string;
}

export type ITagsResponse = IApiResponse<ITag[]>;

export const tagsApi = {
    getTags: () => {
        return axios.get<ITagsResponse>(
            `${process.env.REACT_APP_API_URL}tags/allTags`
        );
    },
};
