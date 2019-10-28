import { Typography } from "@material-ui/core";
import React from "react";
import { BasePage } from "../basePage";

export const BlogPage = (props: { path: string }) => {
    return (
        <BasePage>
            <Typography variant="h4">Blog</Typography>
        </BasePage>
    );
};
