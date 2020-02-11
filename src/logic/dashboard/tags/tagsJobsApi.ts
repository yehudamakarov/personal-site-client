import axios from "axios";
import { IFacade } from "../../../store/entities/projects/ui/selectors";
import { Tag } from "../../../store/entities/tags/actions/api";
import { IMapTagJobStatusLookup, IRenameTagJobStatusLookup } from "../../../store/signalR/reducer";

export const dashboardTagsApi = {
    mapTag: (uniqueKey: string, facadesToMap: IFacade[], tagId: Tag["tagId"]) => {
        return axios.post<IMapTagJobStatusLookup>("/tags/mapTag", { uniqueKey, facadesToMap, tagId });
    },
    renameTag: (uniqueKey: string, existingTagId: Tag["tagId"], newTagId: Tag["tagId"]) => {
        return axios.post<IRenameTagJobStatusLookup>("/tags/renameTag", { uniqueKey, existingTagId, newTagId });
    },
};
