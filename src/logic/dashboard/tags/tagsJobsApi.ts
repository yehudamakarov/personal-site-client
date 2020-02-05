import axios from "axios";
import { IFacade } from "../../../store/entities/projects/ui/selectors";
import { Tag } from "../../../store/entities/tags/actions/api";
import { IMapTagJobStatusLookup, IRenameTagJobStatusLookup } from "../../../store/signalR/reducer";

export const dashboardTagsApi = {
    mapTag: (facadesToMap: IFacade[], tagId: Tag["tagId"]) => {
        return axios.post<IMapTagJobStatusLookup>("/tags/mapTag", { facadesToMap, tagId });
    },
    renameTag: (existingTagId: Tag["tagId"], newTagId: Tag["tagId"]) => {
        return axios.post<IRenameTagJobStatusLookup>("/tags/renameTag", { existingTagId, newTagId });
    },
};
