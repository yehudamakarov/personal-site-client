import * as signalR from "@microsoft/signalr";
import { EnhancedStore } from "@reduxjs/toolkit";
import { registerRenameTagSagaEvents } from "../../logic/dashboard/tags/rename/saga";
import { ITokenState } from "../entities/auth/actions/authReducer";
import { registerMapTagSagaEvents } from "../entities/tagsTransferList/actions/sagas/saveMappedTagsSaga";
import { socketConnectedAction, socketConnectingAction, socketDisconnectedAction } from "../ui/uiActions";
import {
    handleCalculateTagCountsJobStatusUpdateAction,
    handleGithubRepoFetcherJobStatusUpdateAction,
} from "./actions/JobStatusUpdateActions";
import { ICalculateTagCountsStatus, IGithubRepoFetcherStatus } from "./reducer";

export enum JobStage {
    None,
    PreparingDatabase,
    FetchingFromGithub,
    CountingTagged,
    UploadingToDatabase,
    InProgress,
    Done,
    Warning,
    Error,
}

const registerServerMethods = (connection: signalR.HubConnection, dispatch: EnhancedStore["dispatch"]) => {
    // Update Events
    connection.on("PushGithubRepoFetcherJobStatusUpdate", (status: IGithubRepoFetcherStatus) => {
        dispatch(handleGithubRepoFetcherJobStatusUpdateAction(status));
    });
    connection.on("PushCalculateTagCountsJobStatusUpdate", (status: ICalculateTagCountsStatus) => {
        dispatch(handleCalculateTagCountsJobStatusUpdateAction(status));
    });
    registerMapTagSagaEvents(connection, dispatch);
    registerRenameTagSagaEvents(connection, dispatch);
};

let existingConnection: signalR.HubConnection;

export const init = (dispatch: EnhancedStore["dispatch"], token: ITokenState["token"]) => {
    // =============================================================================== //
    if (token === null) {
        dispatch(socketDisconnectedAction(new Error("token was null.")));
        return;
    }
    dispatch(socketConnectingAction());
    // =============================================================================== //
    if (existingConnection) {
        existingConnection.stop().then((value) => {
            dispatch(socketDisconnectedAction(new Error("There was an existing connection that was cleaned up.")));
        });
    }
    // =============================================================================== //
    existingConnection = new signalR.HubConnectionBuilder()
        .configureLogging(
            process.env.NODE_ENV === "development" ? signalR.LogLevel.Information : signalR.LogLevel.Error,
        )
        .withAutomaticReconnect([0, 2000, 10000, 30000, 45000])
        .withUrl(process.env.REACT_APP_API_URL + "/hubs/JobStatusUpdates", { accessTokenFactory: () => token })
        .build();
    // =============================================================================== //
    existingConnection.onreconnecting(() => {
        dispatch(socketConnectingAction());
    });
    existingConnection.onclose(() => {
        dispatch(socketDisconnectedAction(new Error("The connection was closed.")));
    });
    existingConnection.onreconnected(() => {
        dispatch(socketConnectedAction());
    });
    registerServerMethods(existingConnection, dispatch);
    // =============================================================================== //
    existingConnection
        .start()
        .then(() => {
            dispatch(socketConnectedAction());
        })
        .catch((err: Error) => {
            dispatch(socketDisconnectedAction(err));
        });
    // =============================================================================== //
};
