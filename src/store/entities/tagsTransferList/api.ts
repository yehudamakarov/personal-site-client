import axios from "axios";
import { IApiResponse } from "../../baseTypes/IApiResponse";
import { IFacade } from "../projects/ui/selectors";
import { ITag } from "../tags/actions/api";

export type MapTagResponse = IApiResponse<boolean>;

export const tagsTransferListApi = {
    mapTag: (facadesToMap: IFacade[], tagId: ITag["tagId"]) => {
        return axios.post("/tags/mapTag", { facadesToMap, tagId });
    },
};
