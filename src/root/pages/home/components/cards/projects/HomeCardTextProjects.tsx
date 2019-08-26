import React, { useEffect } from 'react'
import { Typography, Grid, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsLoadingAction } from '../../../../../../store/actions/projects/projectsActions';
import { ApplicationState } from '../../../../../../store/reducers/rootReducer';
import HomeProjectCard from './homeProjectCard';

const HomepageCardTextProjects = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, projects } = useSelector((state: ApplicationState) => state.projects)

    useEffect(() => {
        dispatch(getProjectsLoadingAction());
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Projects
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="column">
                    {projects.map((project) =>
                        <Grid item key={project.name}>
                            <HomeProjectCard project={project} />
                        </Grid>

                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export { HomepageCardTextProjects }
