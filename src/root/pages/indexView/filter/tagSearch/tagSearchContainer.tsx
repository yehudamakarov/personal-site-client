import { navigate, RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OptionsType, ValueType } from "react-select/src/types";
import { getTagsLoadingAction } from "../../../../../store/entities/tags/actions/getTags/actions";
import { IApplicationState } from "../../../../../store/rootReducer";
import { IndexTypeRoute, Routes } from "../../../../../store/ui/IUiState";
import { setTagsForFilterAction } from "../../../../../store/ui/uiActions";
import { TagSearchDisplay } from "./tagSearchDisplay";
import { IOptionType } from "./tagSearchHelpers";

interface IOwnProps extends RouteComponentProps<{ tagId?: string }> {
    path: IndexTypeRoute;
}

const navigateToTags = (props: IOwnProps) => {
    if (props.path === Routes.tagsTagIdParam && props.tagId) {
        navigate("/tags").then(() => null);
    }
};

export const TagSearchContainer = (props: IOwnProps) => {
    const dispatch = useDispatch();

    const uri = useSelector((state: IApplicationState) => state.ui.uri);

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
            navigateToTags(props);
        }
    };

    useEffect(() => {
        if (
            props.path === Routes.tagsTagIdParam &&
            props.tagId &&
            props.location
        ) {
            const href = props.location.href;
            const routeTagId = href.slice(href.lastIndexOf("/") + 1);
            tagsChange([routeTagId]);
        }
    }, [uri]);

    useEffect(() => {
        dispatch(getTagsLoadingAction());
    }, []);

    return (
        <TagSearchDisplay
            selectedTagValues={selectedTagValues}
            allTagValues={allTagValues}
            handleChangeMulti={handleChangeMulti}
            editable={false}
        />
    );
};
