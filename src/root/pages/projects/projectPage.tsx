import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { BasePage } from '../basePage';
import { Typography } from '@material-ui/core';

interface OwnProps extends RouteComponentProps<{ projectName?: string }> { };

const ProjectPage = (props: OwnProps) => {
    return (
        <BasePage>
            <Typography variant="h3">
                {props.projectName}
            </Typography>
        </BasePage>
    )
}

export default ProjectPage
