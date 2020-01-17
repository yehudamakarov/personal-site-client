import axios from "axios";
import { IResult } from "../../../baseTypes/IResult";

export class Tag {
    public articleCount?: number;
    public tagId: string = "";
}

export type ITagsResponse = IResult<Tag[]>;

export const tagsApi = {
    getTags: () => {
        return axios.get<ITagsResponse>(`/tags/allTags`);
    },
};
