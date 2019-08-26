import React from 'react'
import { Typography, Container } from "@material-ui/core"
import { BasePage } from '../basePage';

export const ProjectsPage = (props: { path: string }) => {
    return (
        <BasePage>
            <Typography variant="h3">
                Projects
                </Typography>
        </BasePage>
    )
}