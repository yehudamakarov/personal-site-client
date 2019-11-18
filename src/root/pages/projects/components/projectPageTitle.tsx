import { createStyles, LinearProgress, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { ProjectDataHelper } from "../../../../store/entities/projects/helper";
import { IProject } from "../../../../store/entities/projects/ui/actions/api";
import { editProjectTitleAction } from "../../../../store/entities/projects/ui/actions/editProject/editProjectTitle/actions";
import {
    editableProjectTitleSelector,
    projectIsEditableSelector,
} from "../../../../store/entities/projects/ui/selectors";
import { IApplicationState } from "../../../../store/rootReducer";

const AnimatedTypography = animated(Typography);
const AnimatedLinearProgress = animated(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: { ...theme.typography.h4 },
        progress: {
            margin: theme.spacing(1),
        },
    })
);

const ProjectPageTitle = (props: {
    currentProjectName?: string;
    project?: IProject;
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const projectIsLoading = useSelector((state: IApplicationState) => {
        if (props.currentProjectName) {
            return state.projects.projectsUi.singleIsLoading[
                props.currentProjectName
                ];
        } else {
            return false;
        }
    });
    const projectIsEditable = useSelector(
        projectIsEditableSelector(props.project),
    );
    const editableProjectTitle = useSelector(
        editableProjectTitleSelector(props.project),
    );
    const projectId = ProjectDataHelper.getProjectId(props.project);
    const { display, opacity } = useSpring({
        display: projectIsLoading ? "block" : "none",
        opacity: projectIsLoading ? 1 : 0,
    });

    const onEditProjectTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newProjectTitle = event.target.value;
        if (!projectId) {
            return;
        }
        dispatch(editProjectTitleAction(newProjectTitle, projectId));
    };

    return (
        <div>
            <AnimatedLinearProgress
                className={classes.progress}
                style={{ opacity, display }}
                variant="query"
            />
            {projectIsEditable ? (
                <TextField
                    InputProps={{ classes: { root: classes.input } }}
                    helperText={
                        "Edit the project title. Starts off as the repository name."
                    }
                    value={editableProjectTitle}
                    onChange={onEditProjectTitle}
                />
            ) : (
                <AnimatedTypography variant="h4">
                    {props.currentProjectName}
                </AnimatedTypography>
            )}
        </div>
    );
};

export default ProjectPageTitle;
