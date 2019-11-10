import { Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { IProject } from "../../../../store/actions/projects/api";
import { IApplicationState } from "../../../../store/rootReducer";
import { ProjectActionButtons } from "./projectActionButtons";
import ProjectPageTitle from "./projectPageTitle";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topCard: {
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(1),
            },
            padding: theme.spacing(2),
        },
    })
);

export const ProjectPageTitleCard = (props: {
    projectNameFromRoute: string | undefined;
    project: IProject | undefined;
}) => {
    const classes = useStyles();
    const projectIsLoading = useSelector((state: IApplicationState) => {
        if (props.projectNameFromRoute) {
            return state.projects.projectsUi.singleIsLoading[
                props.projectNameFromRoute
                ];
        } else {
            return false;
        }
    });
    const currentProjectName = props.project
        ? props.project.projectTitle
        : props.projectNameFromRoute;

    const currentProjectDescription = props.project
        ? props.project.projectDescription
        : "";
    return (
        <Card className={classes.topCard} elevation={8} square>
            {/* Title */}
            <ProjectPageTitle
                currentProjectName={currentProjectName}
                projectIsLoading={projectIsLoading}
            />
            {/* Description */}
            <Typography variant="subtitle2">
                {currentProjectDescription}
            </Typography>
            {/*Action Buttons*/}
            <ProjectActionButtons project={props.project} />
        </Card>
    );
};
