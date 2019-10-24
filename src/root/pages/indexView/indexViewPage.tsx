import { Typography } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import IndexViewFilter from "./indexViewFilter";
import IndexViewList from "./indexViewList";

export const IndexViewPage = (props: {
    path: "projects" | "blogPosts" | "tags";
}) => {
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


    return (
        <BasePage>
            <Typography variant="h3">Projects and Blog Posts</Typography>
            <IndexViewFilter {...props} />
            <IndexViewList
                listingTypes={filterListingTypes}
                searchText={filterSearchText}
                tagIds={filterTagIds}
            />
        </BasePage>
    );
};
