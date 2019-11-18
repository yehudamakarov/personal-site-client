import { Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { IProject } from "../../../../store/entities/projects/ui/actions/api";
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
    return (
        <Card className={classes.topCard} elevation={8} square>
            {/* Title */}
            <ProjectPageTitle
                project={props.project}
                currentProjectName={
                    props.project
                        ? props.project.projectTitle
                        : props.projectNameFromRoute
                }
            />
            {/* Description */}
            <Typography variant="subtitle2">
                {props.project ? props.project.projectDescription : ""}
            </Typography>
            {/*Action Buttons*/}
            <ProjectActionButtons project={props.project} />
        </Card>
    );
};
