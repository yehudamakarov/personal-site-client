import { CircularProgress, Fab, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleType } from "../../../../store/entities/auth/actions/authReducer";
import { ProjectDataHelper } from "../../../../store/entities/projects/helper";
import { IProject } from "../../../../store/entities/projects/ui/actions/api";
import {
    setAnyProjectIsEditableAction,
    setAnyProjectIsNotEditableAction,
} from "../../../../store/entities/projects/ui/actions/setAnyProjectIsEditable/actions";
import { updateProjectLoading } from "../../../../store/entities/projects/ui/actions/updateProject/actions";
import { editableProjectSelector, projectIsEditableSelector } from "../../../../store/entities/projects/ui/selectors";
import { IApplicationState } from "../../../../store/rootReducer";
import { useAuth } from "../../../hooks/useAuth";

export const EditProjectButton = (props: { project?: IProject }) => {
    const dispatch = useDispatch();
    const isAuthorized = useAuth([roleType.administrator]);

    const projectIsEditable = useSelector(projectIsEditableSelector(props.project));
    const projectId = ProjectDataHelper.getProjectId(props.project);

    const isLoading = useSelector((state: IApplicationState) => {
        if (projectId) {
            return state.projects.projectsUi.singleIsLoading[projectId];
        } else {
            return false;
        }
    });
    const editableProject = useSelector(editableProjectSelector(projectId));

    const handleProjectEdit = () => {
        if (!projectId) {
            return;
        }
        if (!projectIsEditable) {
            dispatch(setAnyProjectIsEditableAction(projectId));
        } else {
            if (editableProject) {
                dispatch(updateProjectLoading(editableProject));
            }
        }
    };

    const handleProjectEditCancel = () => {
        if (!projectId) {
            return;
        }
        dispatch(setAnyProjectIsNotEditableAction(projectId));
    };

    return isLoading ? (
        <Grid container spacing={2}>
            <CircularProgress variant={"indeterminate"} />
        </Grid>
    ) : (
        <Grid container spacing={2}>
            {isAuthorized && (
                <Grid item>
                    <Fab variant="extended" color="secondary" size="small" onClick={handleProjectEdit}>
                        {projectIsEditable ? "Save" : "Edit"}
                    </Fab>
                </Grid>
            )}
            {isAuthorized && projectIsEditable && (
                <Grid item>
                    <Fab variant="extended" color="secondary" size="small" onClick={handleProjectEditCancel}>
                        Cancel
                    </Fab>
                </Grid>
            )}
        </Grid>
    );
};
