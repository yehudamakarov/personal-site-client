import { Button, ButtonGroup, createStyles, Fab, Grid, makeStyles, Theme } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { roleType } from "../../../../store/actions/auth/authReducer";
import { IProject } from "../../../../store/actions/projects/api";
import { IApplicationState } from "../../../../store/rootReducer";
import { GithubIcon } from "../../../iconButtons/icons/githubIcon";

const useAuth = (roles: roleType[]) => {
    debugger;
    const isLoggedIn = useSelector(
        (state: IApplicationState) => state.auth.loggedIn,
    );
    const expiryTime = useSelector(
        (state: IApplicationState) => state.auth.expiryTime,
    );
    const role = useSelector((state: IApplicationState) => state.auth.role);

    if (!isLoggedIn) {
        return false;
    }
    if (expiryTime && expiryTime * 1000 <= Date.now()) {
        return false;
    }
    return roles.some((possibleRole) => possibleRole === role);
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonRightMargin: {
            marginRight: theme.spacing(1),
        },
        iconMarginRight: {
            marginRight: theme.spacing(1),
        },
        leftButton: {
            flexGrow: 1,
        },
        root: {
            display: "flex",
            marginTop: theme.spacing(2),
        },
    })
);

const AnimatedFab = animated(Fab);

export const ProjectActionButtons = (props: {
    project: undefined | IProject;
}) => {
    const { project } = props;
    const classes = useStyles();

    const isAuthorized = useAuth([roleType.administrator]);

    const projectGithubUrl = project
        ? (project.githubUrl as string)
        : undefined;
    const projectDeploymentUrl = project
        ? (project.deploymentUrl as string)
        : undefined;

    const goBack = async () => {
        await navigate("/projects");
    };

    const { opacity, display } = useSpring({
        display: projectDeploymentUrl ? "flex" : "none",
        opacity: projectDeploymentUrl ? 1 : 0,
    });

    return (
        <div className={classes.root}>
            <Grid
                alignItems="center"
                justify="space-between"
                container
                spacing={2}
            >
                <Grid item>
                    <ButtonGroup>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={goBack}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            All Projects
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            href={projectGithubUrl}
                            endIcon={<GithubIcon />}
                        >
                            View Source
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <Grid container spacing={2}>
                        {isAuthorized && (
                            <Grid item>
                                <Fab
                                    variant="extended"
                                    color="secondary"
                                    size="small"
                                >
                                    Edit
                                </Fab>
                            </Grid>
                        )}
                        <Grid item>
                            <AnimatedFab
                                style={{ opacity, display }}
                                variant="extended"
                                color="primary"
                                size="small"
                                href={projectDeploymentUrl}
                            >
                                <WebAssetIcon
                                    className={classes.iconMarginRight}
                                />
                                See Live
                            </AnimatedFab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
