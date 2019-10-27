import { LinearProgress, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { IApplicationState } from "../../../../store/rootReducer";

const AnimatedTypography = animated(Typography);
const AnimatedLinearProgress = animated(LinearProgress);

const ProjectPageTitle = (props: {
    projectNameFromRoute?: string;
    currentProjectName?: string;
}) => {
    const { projectNameFromRoute, currentProjectName } = props;
    const projectIsLoading = useSelector((state: IApplicationState) => {
        if (projectNameFromRoute) {
            return state.projects.projectsUi.singleIsLoading[
                projectNameFromRoute
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
                style={{ opacity, display }}
                variant="query"
            />
            <AnimatedTypography style={{} /*{ opacity }*/} variant="h4">
                {currentProjectName}
            </AnimatedTypography>
        </div>
    );
};

export default ProjectPageTitle;
