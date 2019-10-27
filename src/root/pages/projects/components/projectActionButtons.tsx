import {
    Button,
    ButtonGroup,
    createStyles,
    Fab,
    Grid,
    makeStyles,
    Theme,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import { navigate } from "@reach/router";
import React from "react";
import { animated, useSpring } from "react-spring";
import { IProject } from "../../../../store/actions/projects/api";
import { GithubIcon } from "../../../iconButtons/icons/githubIcon";

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
        seeLive: {
            [theme.breakpoints.down("xs")]: { marginBottom: theme.spacing(2) },
        },
    })
);

const AnimatedFab = animated(Fab);

export const ProjectActionButtons = (props: {
    project: undefined | IProject;
}) => {
    const { project } = props;
    const classes = useStyles();

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
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={goBack}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            All Projects
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            href={projectGithubUrl}
                            endIcon={<GithubIcon />}
                        >
                            View Source
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <AnimatedFab
                        className={classes.seeLive}
                        style={{ opacity, display }}
                        variant="extended"
                        color="primary"
                        size="small"
                        href={projectDeploymentUrl}
                    >
                        <WebAssetIcon className={classes.iconMarginRight} />
                        See Live
                    </AnimatedFab>
                </Grid>
            </Grid>
        </div>
    );
};
