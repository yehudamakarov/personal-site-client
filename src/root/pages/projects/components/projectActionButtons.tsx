import {
    Button,
    createStyles,
    Fab,
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
        iconMarginLeft: {
            marginLeft: theme.spacing(1),
        },
        leftButton: {
            flexGrow: 1,
        },
        root: { display: "flex" },
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

    const { opacity } = useSpring({ opacity: projectDeploymentUrl ? 1 : 0 });

    return (
        <div className={classes.root}>
            <div className={classes.leftButton}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={goBack}
                    startIcon={<ArrowBackIosIcon />}
                >
                    All Projects
                </Button>
            </div>

            <AnimatedFab
                style={{ opacity }}
                variant="extended"
                className={classes.buttonRightMargin}
                color="primary"
                size="small"
                href={projectDeploymentUrl}
            >
                See Live
                <WebAssetIcon className={classes.iconMarginLeft} />
            </AnimatedFab>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                href={projectGithubUrl}
                endIcon={<GithubIcon />}
            >
                View
            </Button>
        </div>
    );
};
