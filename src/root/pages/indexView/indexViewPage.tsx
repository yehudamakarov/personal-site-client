import { Container, Typography } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { IFilter, IFilterListingTypes } from "../../../store/ui/IUiState";
import { setFilterAction } from "../../../store/ui/uiActions";
import { BasePage } from "../basePage";
import IndexViewFilter from "./indexViewFilter";
import IndexViewList from "./indexViewList";

export const IndexViewPage = (props: {
    path: "projects" | "blogPosts" | "tags";
}) => {
    const { path } = props;
    const dispatch = useDispatch();

    const filterListingTypes = useSelector((state: IApplicationState) => {
        return state.ui.filter.listingTypes;
    }, shallowEqual);
    const filterSearchText = useSelector((state: IApplicationState) => {
        return state.ui.filter.searchText;
    });
    const filterTagIds = useSelector((state: IApplicationState) => {
        return state.ui.filter.tagIds;
    }, _.isEqual);

    const currentFilter = {
        listingTypes: filterListingTypes,
        searchText: filterSearchText,
        tagIds: filterTagIds,
    };

    useEffect(() => {
        const cleanedFilterListTypes: any = {};
        Object.keys(filterListingTypes).map((listingTypeKey) => {
            if (listingTypeKey !== path) {
                cleanedFilterListTypes[listingTypeKey] = false;
            }
        });
        const initialFilterFromRoute: IFilter = {
            listingTypes: { ...cleanedFilterListTypes, [path]: true },
            searchText: filterSearchText,
            tagIds: filterTagIds,
        };
        dispatch(setFilterAction(initialFilterFromRoute));
    }, [path]);

    console.count("IndexViewPage rendered");

    return (
        <BasePage>
            <Typography variant="h3">Projects and Blog Posts</Typography>
            <IndexViewFilter filter={currentFilter} />
            <IndexViewList
                listingTypes={filterListingTypes}
                searchText={filterSearchText}
                tagIds={filterTagIds}
            />
        </BasePage>
    );
};
