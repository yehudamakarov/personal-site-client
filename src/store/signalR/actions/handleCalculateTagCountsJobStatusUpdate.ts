import { ICalculateTagCountsStatus } from "../reducer";
/* -------------------------------------------------------------------------- */
/*                          handleCalculateTagCountsJobStatusUpdateAction     */
/* -------------------------------------------------------------------------- */

export const HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE = "HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE";

export interface IHandleCalculateTagCountsJobStatusUpdateAction {
    type: typeof HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE;
    payload: ICalculateTagCountsStatus;
}

export const handleCalculateTagCountsJobStatusUpdateAction = (
    status: ICalculateTagCountsStatus,
): IHandleCalculateTagCountsJobStatusUpdateAction => ({
    payload: status,
    type: HANDLE_CALCULATE_TAG_COUNTS_JOB_STATUS_UPDATE,
});
