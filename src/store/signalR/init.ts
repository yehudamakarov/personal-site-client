import * as signalR from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { ITokenState } from "../entities/auth/actions/authReducer";
import { handleCalculateTagCountsJobStatusUpdateAction } from "./actions/handleCalculateTagCountsJobStatusUpdate";
import { handleGithubRepoFetcherJobStatusUpdateAction } from "./actions/handleGithubRepoFetcherJobStatusUpdate";
import { ICalculateTagCountsStatus, IGithubRepoFetcherStatus } from "./reducer";

export enum JobStage {
    None,
    PreparingDatabase,
    FetchingFromGithub,
    CountingTagged,
    UploadingToDatabase,
    Done,
    Error,
}

const registerServerMethods = (connection: signalR.HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    // todo
    // Lifecycle
    // connection.onreconnecting();
    // connection.onclose();
    // connection.onreconnected();

    // Update Events
    connection.on("PushGithubRepoFetcherJobStatusUpdate", (status: IGithubRepoFetcherStatus) => {
        dispatch(handleGithubRepoFetcherJobStatusUpdateAction(status));
    });
    connection.on("PushCalculateTagCountsJobStatusUpdate", (status: ICalculateTagCountsStatus) => {
        dispatch(handleCalculateTagCountsJobStatusUpdateAction(status));
    });
};

let existingConnection: signalR.HubConnection;

export const init = (dispatch: EnhancedStore["dispatch"], token: ITokenState["token"]) => {
    // tslint:disable-next-line:no-console
    console.log("connecting...");
    if (token === null) {
        return;
    }
    if (existingConnection) {
        existingConnection.stop().then((value) => {
            // tslint:disable-next-line:no-console
            console.log("cleaned existing connection");
        });
    }
    existingConnection = new signalR.HubConnectionBuilder()
        .configureLogging(
            process.env.NODE_ENV === "development" ? signalR.LogLevel.Information : signalR.LogLevel.Error
        )
        .withAutomaticReconnect([0, 2000, 10000, 30000, 45000])
        .withUrl(process.env.REACT_APP_API_URL + "/hubs/JobStatusUpdates", { accessTokenFactory: () => token })
        .build();

    registerServerMethods(existingConnection, dispatch);

    existingConnection
        .start()
        .then(() => {
            // tslint:disable-next-line:no-console
            console.log("connected");
            // todo dispatch that socket is connected
        })
        .catch((error: Error) => {
            // tslint:disable-next-line:no-console
            // todo dispatch that socket is disconnected
            // todo offer to reconnect
            // or set timeout to reconnect again
            console.log("error: ", error);
        });
};
