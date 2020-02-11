import { Button, ButtonGroup, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { navigate } from "@reach/router";
import React from "react";
import { ProjectDataHelper } from "../../../../store/entities/projects/helper";
import { IProject } from "../../../../store/entities/projects/ui/actions/api";
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

export const ProjectActionButtons = (props: { project: undefined | IProject }) => {
    const { project } = props;
    const classes = useStyles();

    const projectGithubUrl = ProjectDataHelper.getProjectGithubUrl(project);

    const goBack = async () => {
        await navigate("/projects");
    };

    return (
        <div className={classes.root}>
            <Grid alignItems="center" justify="space-between" container spacing={2}>
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
                        <Grid item>
                            <EditableDeployUrlDisplay project={project} />
                        </Grid>
                        <Grid item>
                            <EditProjectButton project={project} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
