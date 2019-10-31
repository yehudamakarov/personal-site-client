import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IndexTypeRoute } from "../../../store/ui/IUiState";
import { setRouteAction } from "../../../store/ui/uiActions";
import { BasePage } from "../basePage";
import IndexViewFilter from "./indexViewFilter";
import IndexViewList from "./indexViewList";

export const IndexViewPage = (props: { path: IndexTypeRoute }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRouteAction(props.path));
    }, [props.path]);
    return (
        <BasePage>
            <Typography variant="h4">Projects and Blog Posts</Typography>
            <IndexViewFilter {...props} />
            <IndexViewList />
        </BasePage>
    );
};
