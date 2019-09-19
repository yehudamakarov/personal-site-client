import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { IFilter } from "../../../store/ui/IUiState";
import { setFilterAction } from "../../../store/ui/uiActions";
import { BasePage } from "../basePage";
import IndexViewFilter from "./indexViewFilter";

export const IndexViewPage = (props: {
    path: "projects" | "blogPosts" | "all";
}) => {
    const { path } = props;
    const dispatch = useDispatch();
    const filter = useSelector((state: IApplicationState) => {
        return state.ui.filter;
    }, shallowEqual);
    useEffect(() => {
        const initialFilterFromRoute = { ...filter, listingType: path };
        dispatch(setFilterAction(initialFilterFromRoute));
    }, [path]);

    const setFilter = (newFilter: IFilter) => {
        dispatch(setFilterAction(newFilter));
    };

    return (
        <BasePage>
            <Typography variant="h3">Projects and Blog Posts</Typography>
            <IndexViewFilter filter={filter} setFilter={setFilter} />
        </BasePage>
    );
};
