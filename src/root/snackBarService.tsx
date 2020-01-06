import { Button, Snackbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IApplicationState } from "../store/rootReducer";
import { GithubRepoFetcherJobStage } from "../store/signalR/registerJobStatusUpdates";

export const SnackBarService = (props: {}) => {
    const [manuallyOpen, setOpen] = React.useState(true);
    const currentJobStage = useSelector((state: IApplicationState) => {
        return state.jobStatus.githubRepoFetcherStatus.jobStatus;
    });
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        console.log("setting Closed", reason);
        if (reason === "timeout" && currentJobStage !== GithubRepoFetcherJobStage.None) {
            console.log("returned early");
            return;
        }
        setOpen(false);
    };
    useEffect(() => {
        if (currentJobStage !== GithubRepoFetcherJobStage.None) {
            setOpen(true);
        }
    }, [currentJobStage]);
    const gotItButton = (
        <Button key="got-it" onClick={handleClose} size="small" variant="contained" color="secondary">
            Got it.
        </Button>
    );

    const getRepoMessage = (githubRepoFetcherJobStageElement: GithubRepoFetcherJobStage): string => {
        switch (githubRepoFetcherJobStageElement) {
            case GithubRepoFetcherJobStage.None:
                return "...";
            case GithubRepoFetcherJobStage.PreparingDatabase:
                return "preparing the database...";
            case GithubRepoFetcherJobStage.Fetching:
                return "fetching remote data...";
            case GithubRepoFetcherJobStage.Uploading:
                return "uploading processed data...";
            case GithubRepoFetcherJobStage.Done:
                return "done!";
            case GithubRepoFetcherJobStage.Error:
                return "encountering a problem...";
            default:
                return "...";
        }
    };

    return (
        <Snackbar
            open={currentJobStage !== GithubRepoFetcherJobStage.None && manuallyOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            message={`Fetching and syncing repos: Currently ${getRepoMessage(currentJobStage)}`}
            onClose={handleClose}
            autoHideDuration={6000}
            action={[gotItButton]}
        />
    );
};
