import { IResult } from "../../../../store/baseTypes/IResult";
import { Tag } from "../../../../store/entities/tags/actions/api";

export const TAG_RENAME_JOB_DONE = "TAG_RENAME_JOB_DONE";

export interface ITagRenameJobDoneAction {
    type: typeof TAG_RENAME_JOB_DONE;
    payload: IResult<Tag> | null;
}

export const tagRenameJobDoneAction = (item: IResult<Tag> | null): ITagRenameJobDoneAction => ({
    payload: item,
    type: TAG_RENAME_JOB_DONE,
});
// =============================================================================== //
