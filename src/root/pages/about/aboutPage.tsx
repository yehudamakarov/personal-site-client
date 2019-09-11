import { Typography } from "@material-ui/core";
import React from "react";
import { BasePage } from "../basePage";

export const AboutPage = (props: { path: string }) => {
    return (
        <BasePage>
            <Typography variant="h3">About</Typography>
        </BasePage>
    );
};
