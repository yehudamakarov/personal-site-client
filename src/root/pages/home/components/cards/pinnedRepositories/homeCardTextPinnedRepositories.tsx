import {
    Card,
    Fade,
    Grid,
    LinearProgress,
    Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPinnedRepositoriesLoadingAction } from "../../../../../../store/actions/pinnedRepositories/getPinnedRepositories/actions";
import { IApplicationState } from "../../../../../../store/rootReducer";
import HomeProjectCard from "./homeProjectCard";

const HomepageCardTextPinnedRepositories = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, pinnedRepositories } = useSelector(
        (state: IApplicationState) => state.pinnedRepositories
    );

    useEffect(() => {
        dispatch(getPinnedRepositoriesLoadingAction());
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3">Some Projects</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="subtitle2">
                    These are my pinned repositories on Github.
                </Typography>
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
                        pinnedRepositories.map((pinnedRepository) => (
                            <Grid item key={pinnedRepository.name}>
                                <HomeProjectCard project={pinnedRepository} />
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export { HomepageCardTextPinnedRepositories };
