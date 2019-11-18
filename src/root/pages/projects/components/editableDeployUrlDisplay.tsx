import { createStyles, Fab, makeStyles, TextField, Theme } from "@material-ui/core";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { ProjectDataHelper } from "../../../../store/entities/projects/helper";
import { IProject } from "../../../../store/entities/projects/ui/actions/api";
import { editProjectDeploymentUrlAction } from "../../../../store/entities/projects/ui/actions/editProject/editProjectDeploymentUrl/actions";
import {
    editableProjectDeploymentUrlSelector,
    projectIsEditableSelector,
} from "../../../../store/entities/projects/ui/selectors";

const AnimatedFab = animated(Fab);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconMarginRight: {
            marginRight: theme.spacing(1),
        },
    })
);

export const EditableDeployUrlDisplay = (props: { project?: IProject }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const projectId = ProjectDataHelper.getProjectId(props.project);
    const projectIsEditable = useSelector(
        projectIsEditableSelector(props.project),
    );
    const projectDeploymentUrl = ProjectDataHelper.getProjectDeploymentUrl(
        props.project,
    );
    const editableProjectDeploymentUrl = useSelector(
        editableProjectDeploymentUrlSelector(props.project),
    );

    const onEditProjectDeploymentUrl = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newDeploymentUrl = event.target.value;
        if (!projectId) {
            return;
        }

        dispatch(editProjectDeploymentUrlAction(newDeploymentUrl, projectId));
    };

    const { opacity, display } = useSpring({
        display: projectDeploymentUrl ? "flex" : "none",
        opacity: projectDeploymentUrl ? 1 : 0,
    });

    return (
        <>
            {projectIsEditable ? (
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
                    href={projectDeploymentUrl}
                >
                    <WebAssetIcon className={classes.iconMarginRight} />
                    See Live
                </AnimatedFab>
            )}
        </>
    );
};
