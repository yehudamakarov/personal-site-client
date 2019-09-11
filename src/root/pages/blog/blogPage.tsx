import { Container, Typography } from "@material-ui/core";
import React from "react";
import { BasePage } from "../basePage";

export const BlogPage = (props: { path: string }) => {
    return (
        <BasePage>
            <Typography variant="h3">Blog</Typography>
        </BasePage>
    );
};
