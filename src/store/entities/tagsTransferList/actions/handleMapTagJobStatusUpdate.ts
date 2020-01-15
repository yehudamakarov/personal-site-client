import { IMapTagJobStatus } from "../../../signalR/reducer";

export const HANDLE_MAP_TAG_JOB_STATUS_UPDATE = "HANDLE_MAP_TAG_JOB_STATUS_UPDATE";

export interface IHandleMapTagJobStatusUpdateAction {
    type: typeof HANDLE_MAP_TAG_JOB_STATUS_UPDATE;
    payload: IMapTagJobStatus;
}

export const handleMapTagJobStatusUpdateAction = (status: IMapTagJobStatus): IHandleMapTagJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_MAP_TAG_JOB_STATUS_UPDATE,
});
