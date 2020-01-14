import { createStyles, IconButton, makeStyles, Snackbar, SnackbarContent, Theme } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { getJobStatusMessage } from "../helpers/jobMessageHelpers";
import { IApplicationState } from "../store/rootReducer";
import { JobStage } from "../store/signalR/init";
import { useSnackbarUtils } from "./hooks/useSnackBarUtils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        success: { backgroundColor: theme.palette.success.dark },
    }),
);

export const GenericJobStatusSnackbar = (props: {
    currentJobStateSelector: (state: IApplicationState) => JobStage;
    baseCase: JobStage;
    title: string;
}) => {
    const classes = useStyles();
    const [open, handleClose, currentJobStage] = useSnackbarUtils(props.currentJobStateSelector, props.baseCase);
    const message = `${props.title}: ${getJobStatusMessage(currentJobStage)}`;
    const isDone = currentJobStage === JobStage.Done;
    const gotIt = isDone ? (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CheckCircleIcon fontSize="small" />
        </IconButton>
    ) : (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            key={message}
            onClose={handleClose}
            autoHideDuration={5000}
        >
            <SnackbarContent className={isDone ? classes.success : ""} message={message} action={[gotIt]} />
        </Snackbar>
    );
};
