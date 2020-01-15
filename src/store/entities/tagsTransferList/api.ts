import axios from "axios";
import { IResult } from "../../baseTypes/IResult";
import { IFacade } from "../projects/ui/selectors";
import { ITag } from "../tags/actions/api";

export type MapTagResponse = IResult<ITag["tagId"]>;

export const tagsTransferListApi = {
    mapTag: (facadesToMap: IFacade[], tagId: ITag["tagId"]) => {
        return axios.post("/tags/mapTag", { facadesToMap, tagId });
    },
};
