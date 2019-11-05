import { createStyles, LinearProgress, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { animated, useSpring } from "react-spring";

const AnimatedTypography = animated(Typography);
const AnimatedLinearProgress = animated(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(1),
        },
    }),
);

const ProjectPageTitle = (props: {
    projectIsLoading: boolean;
    currentProjectName?: string;
}) => {
    const classes = useStyles();
    const { display, opacity } = useSpring({
        display: props.projectIsLoading ? "block" : "none",
        opacity: props.projectIsLoading ? 1 : 0,
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
