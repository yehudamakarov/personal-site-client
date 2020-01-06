import * as signalR from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { ITokenState } from "../entities/auth/actions/authReducer";
import { handleGithubRepoFetcherJobStatusUpdateAction } from "./actions/handleGithubRepoFetcherJobStatusUpdate";
import { IGithubRepoFetcherStatus } from "./reducer";

export enum GithubRepoFetcherJobStage {
    None,
    PreparingDatabase,
    Fetching,
    Uploading,
    Done,
    Error,
}

const registerServerMethods = (connection: signalR.HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    connection.on("PushGithubRepoFetcherJobStatusUpdate", (status: IGithubRepoFetcherStatus) => {
        dispatch(handleGithubRepoFetcherJobStatusUpdateAction(status));

        // todo --------------------------------------------
        //      make a jobNotificationReducer
        //      dispatch an action on every call here.
        //      make a component above app to use a snackbar
        //      that component can useSelector for individually diffable pieces of state. on every change it will rerender and display newest message
    });
};

let existingConnection: signalR.HubConnection;

export const registerJobStatusUpdates = (dispatch: EnhancedStore["dispatch"], token: ITokenState["token"]) => {
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
            process.env.NODE_ENV === "development" ? signalR.LogLevel.Information : signalR.LogLevel.Error,
        )
        .withAutomaticReconnect()
        .withUrl(process.env.REACT_APP_API_URL + "/hubs/JobStatusUpdates", { accessTokenFactory: () => token })
        .build();

    registerServerMethods(existingConnection, dispatch);

    existingConnection
        .start()
        .then(() => {
            // tslint:disable-next-line:no-console
            console.log("connected");
        })
        .catch((error: Error) => {
            // tslint:disable-next-line:no-console
            console.log("error: ", error);
        });
};
