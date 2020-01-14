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

            {/*<AddToProjectsSnackbar />*/}
        </React.Fragment>
    );
};
