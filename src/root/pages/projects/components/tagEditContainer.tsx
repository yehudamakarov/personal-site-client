import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OptionsType, ValueType } from "react-select/src/types";
import { IProject } from "../../../../store/actions/projects/api";
import { getTagsLoadingAction } from "../../../../store/actions/tags/getTags/actions";
import { IApplicationState } from "../../../../store/rootReducer";
import { TagSearchDisplay } from "../../indexView/filter/tagSearch/tagSearchDisplay";
import { IOptionType } from "../../indexView/filter/tagSearch/tagSearchHelpers";

export const TagEditContainer = (props: { project: IProject | undefined }) => {
    const dispatch = useDispatch();

    const allTagValues = useSelector((state: IApplicationState) =>
        state.tags.tagsData.map((tag) => ({
            label: tag.tagId,
            value: tag.tagId,
        })),
    );

    const selectedTagValues = useSelector((state: IApplicationState) =>
        state.ui.filter.tagIds.map((tagId) => ({
            label: tagId,
            value: tagId,
        })),
    );

    const tagsChange = (values: string[]) => {
        // dispatch(setTagsForFilterAction([...values]));
    };

    const handleChangeMulti = (values: ValueType<IOptionType>) => {
        if (values) {
            tagsChange(
                (values as OptionsType<IOptionType>).map((value) => value.label),
            );
        } else {
            tagsChange([]);
        }
    };

    useEffect(() => {
        dispatch(getTagsLoadingAction());
    }, []);

    return (
        <TagSearchDisplay
            selectedTagValues={selectedTagValues}
            allTagValues={allTagValues}
            handleChangeMulti={handleChangeMulti}
        />
    );
};
