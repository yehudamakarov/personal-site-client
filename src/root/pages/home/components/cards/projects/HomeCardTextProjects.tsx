import React from 'react'
import { Typography, Grid } from '@material-ui/core';

const HomeCardTextProjects = () => {
    return (
        <Grid spacing={1}>
            <Grid item >
                <Typography variant="h3">
                    Projects
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1">
                    Projects here
                </Typography>
            </Grid>
        </Grid>
    )
}

export { HomeCardTextProjects }
