import { LinearProgress, Typography } from "@material-ui/core";
import React from "react";
import { animated, useSpring } from "react-spring";

const AnimatedTypography = animated(Typography);
const AnimatedLinearProgress = animated(LinearProgress);

const ProjectPageTitle = (props: {
    projectIsLoading: boolean;
    currentProjectName?: string;
}) => {
    const { display, opacity } = useSpring({
        display: props.projectIsLoading ? "block" : "none",
        opacity: props.projectIsLoading ? 1 : 0,
    });

    return (
        <div>
            <AnimatedLinearProgress
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
