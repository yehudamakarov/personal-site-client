import { Typography } from "@material-ui/core";
import React from "react";
import { BasePage } from "../basePage";
import IndexViewFilter from "./indexViewFilter";
import IndexViewList from "./indexViewList";

export const IndexViewPage = (props: {
    path: "projects" | "blogPosts" | "tags";
}) => {


    return (
        <BasePage>
            <Typography variant="h4">Projects and Blog Posts</Typography>
            <IndexViewFilter {...props} />
            <IndexViewList

            />
        </BasePage>
    );
};
