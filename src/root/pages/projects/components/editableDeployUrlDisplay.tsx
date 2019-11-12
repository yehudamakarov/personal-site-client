import { createStyles, Fab, makeStyles, TextField, Theme } from "@material-ui/core";
import WebAssetIcon from "@material-ui/core/SvgIcon";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { editProjectAction } from "../../../../store/actions/projects/ui/editProject/actions";
import { IApplicationState } from "../../../../store/rootReducer";

const AnimatedFab = animated(Fab);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconMarginRight: {
            marginRight: theme.spacing(1),
        },
    })
);

export const EditableDeployUrlDisplay = (props: {
    projectIsEditable: boolean;
    projectDeploymentUrl: string | undefined;
    projectId: string | undefined;
}) => {
    const dispatch = useDispatch();

    const classes = useStyles();

    const onEditProjectDeploymentUrl = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newDeploymentUrl = event.target.value;
        if (!editableProject) {
            return;
        }
        const editedProject = {
            ...editableProject,
            deploymentUrl: newDeploymentUrl,
        };
        dispatch(editProjectAction(editedProject));
    };

    const { opacity, display } = useSpring({
        display: props.projectDeploymentUrl ? "flex" : "none",
        opacity: props.projectDeploymentUrl ? 1 : 0,
    });

    const editableProject = useSelector((state: IApplicationState) => {
        if (props.projectIsEditable && props.projectId) {
            return state.projects.projectsUi.editableProjects[props.projectId];
        }
    }, shallowEqual);

    const editableProjectDeploymentUrl = editableProject
        ? editableProject.deploymentUrl
        : undefined;

    return (
        <>
            {props.projectIsEditable ? (
                <TextField
                    helperText={"Where this project is deployed to."}
                    value={editableProjectDeploymentUrl}
                    onChange={onEditProjectDeploymentUrl}
                />
            ) : (
                <AnimatedFab
                    style={{ opacity, display }}
                    variant="extended"
                    color="primary"
                    size="small"
                    href={props.projectDeploymentUrl}
                >
                    <WebAssetIcon className={classes.iconMarginRight} />
                    See Live
                </AnimatedFab>
            )}
        </>
    );
};
