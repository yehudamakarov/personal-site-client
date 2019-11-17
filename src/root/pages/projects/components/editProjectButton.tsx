import { Fab, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { roleType } from "../../../../store/actions/auth/authReducer";
import {
    setAnyProjectIsDoneEditingAction,
    setAnyProjectIsEditableAction,
} from "../../../../store/actions/projects/ui/setAnyProjectIsEditable/actions";
import { useAuth } from "../../../hooks/useAuth";

export const EditProjectButton = (props: {
    projectIsEditable: boolean;
    projectId: string | undefined;
}) => {
    const dispatch = useDispatch();
    const isAuthorized = useAuth([roleType.administrator]);
    const handleProjectEdit = () => {
        const editing = !props.projectIsEditable;
        if (!props.projectId) {
            return;
        }
        if (editing) {
            dispatch(setAnyProjectIsEditableAction(props.projectId));
        } else {
            dispatch(setAnyProjectIsDoneEditingAction(props.projectId));
        }
    };

    return (
        <Grid container spacing={2}>
            {isAuthorized && (
                <Grid item>
                    <Fab
                        variant="extended"
                        color="secondary"
                        size="small"
                        onClick={handleProjectEdit}
                    >
                        {props.projectIsEditable ? "Done" : "Edit"}
                    </Fab>
                </Grid>
            )}
            {isAuthorized && props.projectIsEditable && (
                <Grid item>
                    <Fab
                        variant="extended"
                        color="secondary"
                        size="small"
                        onClick={handleProjectEdit}
                    >
                        Cancel
                    </Fab>
                </Grid>
            )}
        </Grid>
    );
};
