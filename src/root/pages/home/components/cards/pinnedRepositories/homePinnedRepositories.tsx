import { createStyles, Grid, LinearProgress, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPinnedRepositoriesLoadingAction } from "../../../../../../store/entities/pinnedRepositories/actions/getPinnedRepositories/actions";
import { IApplicationState } from "../../../../../../store/rootReducer";
import HomeProjectCard from "./homeProjectCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up("md")]: {
                paddingLeft: theme.spacing(8),
                paddingRight: theme.spacing(8),
            },
            [theme.breakpoints.down("md")]: {
                paddingLeft: theme.spacing(6),
                paddingRight: theme.spacing(6),
            },
            [theme.breakpoints.down("xs")]: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
            },
        },
    })
);

export const HomePinnedRepositories = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isLoading, isError, pinnedRepositories } = useSelector(
        (state: IApplicationState) => state.pinnedRepositories
    );

    useEffect(() => {
        dispatch(getPinnedRepositoriesLoadingAction());
    }, []);

    return (
        <Grid container spacing={2}>
            {isLoading && <LinearProgress variant="query" />}

            {isError && (
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="subtitle2" color="error">
                        There was a problem fetching the information that is
                        supposed to be displayed here.
                    </Typography>
                </Grid>
            )}

            {!isLoading &&
                !isError &&
                pinnedRepositories.map((pinnedRepository) => (
                    <Grid item xs={12} sm={6} key={pinnedRepository.name}>
                        <HomeProjectCard project={pinnedRepository} />
                    </Grid>
                ))}
        </Grid>
    );
};
