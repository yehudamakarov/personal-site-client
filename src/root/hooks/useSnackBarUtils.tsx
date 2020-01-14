import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store/rootReducer";
import { JobStage } from "../../store/signalR/init";

export const useSnackbarUtils = (
    currentJobStateSelector: (state: IApplicationState) => JobStage,
    baseCase: JobStage,
) => {
    const [manuallyOpen, setOpen] = React.useState(true);
    const currentJobStage = useSelector(currentJobStateSelector);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (currentJobStage !== baseCase) {
            setOpen(true);
        }
    }, [baseCase, currentJobStage]);

    const open = currentJobStage !== baseCase && manuallyOpen;
    const results: [
        boolean,
        (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void | undefined,
        JobStage
    ] = [open, handleClose, currentJobStage];
    return results;
};
