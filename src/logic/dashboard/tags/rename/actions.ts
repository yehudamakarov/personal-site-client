import { IResult } from "../../../../store/baseTypes/IResult";
import { Tag } from "../../../../store/entities/tags/actions/api";

export const TAG_RENAME_JOB_DONE = "TAG_RENAME_JOB_DONE";

export interface ITagRenameJobDoneAction {
    type: typeof TAG_RENAME_JOB_DONE;
    payload: { item: IResult<Tag> | null; uniqueKey: string };
}

export const tagRenameJobDoneAction = (uniqueKey: string, item: IResult<Tag> | null): ITagRenameJobDoneAction => ({
    payload: { item, uniqueKey },
    type: TAG_RENAME_JOB_DONE,
});
// =============================================================================== //
export const MAP_TAG_JOB_DONE = "MAP_TAG_JOB_DONE";

export interface IMapTagJobDoneAction {
    type: typeof MAP_TAG_JOB_DONE;
    payload: { item: IResult<Tag> | null; uniqueKey: string };
}

export const mapTagJobDoneAction = (uniqueKey: string, item: IResult<Tag> | null): IMapTagJobDoneAction => ({
    payload: { item, uniqueKey },
    type: MAP_TAG_JOB_DONE,
});
// =============================================================================== //
