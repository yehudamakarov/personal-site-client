import { Container, Typography } from "@material-ui/core";
import React from "react";
import { BasePage } from "../basePage";

export const ProjectsPage = (props: { path: string }) => {
    return (
        <BasePage>
            <Typography variant="h3">Projects</Typography>
        </BasePage>
    );
};
