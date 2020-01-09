import { JobStage } from "../store/signalR/registerJobStatusUpdates";

export const getJobStatusMessage = (jobStage: JobStage): string => {
    switch (jobStage) {
        case JobStage.None:
            return "...";
        case JobStage.PreparingDatabase:
            return "Preparing database...";
        case JobStage.FetchingFromGithub:
            return "Fetching data from Github";
        case JobStage.CountingTagged:
            return "Counting articles";
        case JobStage.UploadingToDatabase:
            return "Uploading data to database";
        case JobStage.Done:
            return "Complete!";
        case JobStage.Error:
            return "Encountered a problem.";
        default:
            return "...";
    }
};
