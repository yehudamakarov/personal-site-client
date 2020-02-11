import { Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IndexTypeRoute } from "../../../store/ui/IUiState";
import { setRouteAction } from "../../../store/ui/uiActions";
import { BasePage } from "../basePage";
import IndexViewFilter from "./indexViewFilter";
import IndexViewList from "./indexViewList";

interface IOwnProps extends RouteComponentProps<{ tagId?: string }> {
    path: IndexTypeRoute;
}

export const IndexViewPage = (props: IOwnProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRouteAction({ route: props.path, uri: props.uri }));
    }, [props.uri]);
    return (
        <BasePage>
            <Typography variant="h4">Projects and Blog Posts</Typography>
            <IndexViewFilter {...props} />
            <IndexViewList />
        </BasePage>
    );
};
