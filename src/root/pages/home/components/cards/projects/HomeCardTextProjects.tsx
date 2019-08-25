import React, { useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getProjectsLoadingAction } from '../../../../../../store/actions/projects/projectsActions';

const HomeCardTextProjects = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectsLoadingAction);
    }, [])

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
