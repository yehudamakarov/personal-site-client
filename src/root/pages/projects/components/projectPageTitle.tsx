import { createStyles, LinearProgress, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { IApplicationState } from "../../../../store/rootReducer";

const AnimatedTypography = animated(Typography);
const AnimatedLinearProgress = animated(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(1),
        },
    })
);

const ProjectPageTitle = (props: { currentProjectName?: string }) => {
    const classes = useStyles();
    const projectIsLoading = useSelector((state: IApplicationState) => {
        if (props.currentProjectName) {
            return state.projects.projectsUi.singleIsLoading[
                props.currentProjectName
                ];
        } else {
            return false;
        }
    });
    const { display, opacity } = useSpring({
        display: projectIsLoading ? "block" : "none",
        opacity: projectIsLoading ? 1 : 0,
    });

    return (
        <div>
            <AnimatedLinearProgress
                className={classes.progress}
                style={{ opacity, display }}
                variant="query"
            />
            <AnimatedTypography variant="h4">
                {props.currentProjectName}
            </AnimatedTypography>
        </div>
    );
};

export default ProjectPageTitle;
