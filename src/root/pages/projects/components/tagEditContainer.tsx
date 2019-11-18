import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OptionsType, ValueType } from "react-select/src/types";
import { IProject } from "../../../../store/entities/projects/ui/actions/api";
import { editProjectTagIdsAction } from "../../../../store/entities/projects/ui/actions/editProject/editProjectTags/actions";
import { getTagsLoadingAction } from "../../../../store/entities/tags/actions/getTags/actions";
import { IApplicationState } from "../../../../store/rootReducer";
import { TagSearchDisplay } from "../../indexView/filter/tagSearch/tagSearchDisplay";
import { IOptionType } from "../../indexView/filter/tagSearch/tagSearchHelpers";

export const TagEditContainer = (props: { project: IProject | undefined }) => {
    const dispatch = useDispatch();

    const allTagValues = useSelector((state: IApplicationState) =>
        state.tags.tagsData.map((tag) => ({
            label: tag.tagId,
            value: tag.tagId,
        }))
    );

    const selectedTagValues = useSelector((state: IApplicationState) => {
        if (props.project && props.project.githubRepoDatabaseId) {
            const tagIds =
                state.projects.projectsUi.editableProjects[
                    props.project.githubRepoDatabaseId
                ].tagIds;
            if (tagIds) {
                return tagIds.map((tagId) => ({
                    label: tagId,
                    value: tagId,
                }));
            } else {
                return [];
            }
        } else {
            return [];
        }
    });

    const tagsChange = (values: string[]) => {
        if (props.project) {
            dispatch(
                editProjectTagIdsAction(
                    values,
                    props.project.githubRepoDatabaseId
                )
            );
        }
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
