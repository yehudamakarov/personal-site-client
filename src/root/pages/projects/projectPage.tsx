import { Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { BasePage } from "../basePage";

interface IOwnProps extends RouteComponentProps<{ projectName?: string }> {}

const ProjectPage = (props: IOwnProps) => {
    return (
        <BasePage>
            <Typography variant="h3">{props.projectName}</Typography>
        </BasePage>
    );
};

export default ProjectPage;
