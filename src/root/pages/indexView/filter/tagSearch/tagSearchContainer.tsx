import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OptionsType, ValueType } from "react-select/src/types";
import { getTagsLoadingAction } from "../../../../../store/actions/tags/getTags/actions";
import { IApplicationState } from "../../../../../store/rootReducer";
import { setTagsForFilterAction } from "../../../../../store/ui/uiActions";
import { TagSearchDisplay } from "./tagSearchDisplay";
import { IOptionType } from "./tagSearchDisplayHelpers";

export const TagSearchContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTagsLoadingAction());
    }, []);

    const allTagValues = useSelector((state: IApplicationState) =>
        state.tags.tagsData.map((tag) => ({
            label: tag.tagId,
            value: tag.tagId,
        }))
    );

    const selectedTagValues = useSelector((state: IApplicationState) =>
        state.ui.filter.tagIds.map((tagId) => ({
            label: tagId,
            value: tagId,
        }))
    );

    const tagsChange = (values: string[]) => {
        dispatch(setTagsForFilterAction([...values]));
    };

    const handleChangeMulti = (values: ValueType<IOptionType>) => {
        if (values) {
            tagsChange(
                (values as OptionsType<IOptionType>).map((value) => value.label)
            );
        } else {
            tagsChange([]);
        }
    };

    return (
        <TagSearchDisplay
            selectedTagValues={selectedTagValues}
            allTagValues={allTagValues}
            handleChangeMulti={handleChangeMulti}
        />
    );
};
