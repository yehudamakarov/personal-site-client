import React from "react";
import { IApplicationState } from "../store/rootReducer";
import { JobStage } from "../store/signalR/init";
import { GenericJobStatusSnackbar } from "./genericJobStatusSnackbar";

export const SnackBarService = (props: {}) => {
    const githubRepoFetcherJobSelector = (state: IApplicationState) => {
        return state.jobStatus.githubRepoFetcherStatus.jobStage;
    };
    const handleTagCountsJobSelector = (state: IApplicationState) => {
        return state.jobStatus.calculateTagCountsStatus.jobStage;
    };
    const mapTagJobSelector = (state: IApplicationState) => {
        const currentTagId = state.jobStatus.currentTagIdBeingMapped;
        if (currentTagId) {
            const jobStatus = state.jobStatus.mapTagStatus[currentTagId];
            return jobStatus ? jobStatus.jobStage : JobStage.None;
        }

        return JobStage.None;
    };

    const deleteTagJobSelector = (state: IApplicationState) => {
        const currentTagId = state.jobStatus.currentTagIdBeingDeleted;
        if (currentTagId) {
            const jobStatus = state.jobStatus.deleteTagStatus[currentTagId];
            return jobStatus ? jobStatus.jobStage : JobStage.None;
        }
        return JobStage.None;
    };
    return (
        <React.Fragment>
            <GenericJobStatusSnackbar
                currentJobStateSelector={githubRepoFetcherJobSelector}
                baseCase={JobStage.None}
                title={"Github Repositories Syncing"}
            />
            <GenericJobStatusSnackbar
                currentJobStateSelector={handleTagCountsJobSelector}
                baseCase={JobStage.None}
                title={"Calculating Tag Counts"}
            />
            <GenericJobStatusSnackbar
                currentJobStateSelector={mapTagJobSelector}
                baseCase={JobStage.None}
                title={"Mapping Tag"}
            />
            <GenericJobStatusSnackbar
                currentJobStateSelector={deleteTagJobSelector}
                baseCase={JobStage.None}
                title={"Deleting Tag"}
            />
        </React.Fragment>
    );
};
