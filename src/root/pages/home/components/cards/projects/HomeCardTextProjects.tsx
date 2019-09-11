import {
    Card,
    Fade,
    Grid,
    LinearProgress,
    Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsLoadingAction } from "../../../../../../store/actions/projects/projectsActions";
import { IApplicationState } from "../../../../../../store/reducers/rootReducer";
import HomeProjectCard from "./homeProjectCard";

const HomepageCardTextProjects = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, projects } = useSelector(
        (state: IApplicationState) => state.projects
    );

    useEffect(() => {
        dispatch(getProjectsLoadingAction());
    }, [dispatch]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Projects</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="column">
                    {isLoading && <LinearProgress variant="query" />}
                    {isError && (
                        <Grid item xs={12} sm={8} md={6}>
                            <Typography variant="subtitle2" color="error">
                                There was a problem fetching the information
                                that is supposed to be displayed here.
                            </Typography>
                        </Grid>
                    )}
                    {!isLoading &&
                        !isError &&
                        projects.map((project) => (
                            <Grid item key={project.name}>
                                <HomeProjectCard project={project} />
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export { HomepageCardTextProjects };
