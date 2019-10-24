import { Typography } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { IFilter } from "../../../store/ui/IUiState";
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
        Object.keys(filterListingTypes).forEach(clearOtherListingTypes);

        function clearOtherListingTypes(listingTypeKey: string) {
            if (listingTypeKey !== path) {
                cleanedFilterListTypes[listingTypeKey] = false;
            }
        }

        const initialFilterFromRoute: IFilter = {
            listingTypes: { ...cleanedFilterListTypes, [path]: true },
            searchText: filterSearchText,
            tagIds: filterTagIds,
        };
        // todo make this it's own action to set the filterTypesFromRoute. send only the path and generate an object that's empty
        dispatch(setFilterAction(initialFilterFromRoute));
    }, [path]);
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
