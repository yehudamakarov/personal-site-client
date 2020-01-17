import axios from "axios";
import { IMapTagJobStatus } from "../../signalR/reducer";
import { IFacade } from "../projects/ui/selectors";
import { Tag } from "../tags/actions/api";

export const tagsTransferListApi = {
    mapTag: (facadesToMap: IFacade[], tagId: Tag["tagId"]) => {
        return axios.post<IMapTagJobStatus>("/tags/mapTag", { facadesToMap, tagId });
    },
};
