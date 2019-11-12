import {
    Button,
    ButtonGroup,
    createStyles,
    Grid,
    makeStyles,
    Theme,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { IProject } from "../../../../store/actions/projects/api";
import { IApplicationState } from "../../../../store/rootReducer";
import { GithubIcon } from "../../../iconButtons/icons/githubIcon";
import { EditableDeployUrlDisplay } from "./editableDeployUrlDisplay";
import { EditProjectButton } from "./editProjectButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonRightMargin: {
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
    const projectId = project
        ? (project.githubRepoDatabaseId as string)
        : undefined;

    const projectIsEditable = useSelector((state: IApplicationState) => {
        if (projectId) {
            return state.projects.projectsUi.singleIsEditing[projectId];
        } else {
            return false;
        }
    });

    const goBack = async () => {
        await navigate("/projects");
    };

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
                        <EditProjectButton
                            projectIsEditable={projectIsEditable}
                            projectId={projectId}
                        />
                        <Grid item>
                            <EditableDeployUrlDisplay
                                projectIsEditable={projectIsEditable}
                                projectDeploymentUrl={projectDeploymentUrl}
                                projectId={projectId}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
