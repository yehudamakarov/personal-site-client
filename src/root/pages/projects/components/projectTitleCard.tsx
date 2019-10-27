import { Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { IProject } from "../../../../store/actions/projects/api";
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
    }),
);

export const ProjectPageTitleCard = (props: {
    projectNameFromRoute: string | undefined;
    project: IProject | undefined;
}) => {
    const classes = useStyles();
    const currentProjectName = props.project
        ? props.project.projectTitle
        : props.projectNameFromRoute;

    const currentProjectDescription = props.project
        ? props.project.projectDescription
        : "";
    return (
        <Card className={classes.topCard} square>
            {/* Title */}
            <ProjectPageTitle
                currentProjectName={currentProjectName}
                projectNameFromRoute={props.projectNameFromRoute}
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
