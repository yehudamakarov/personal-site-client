import { CLOSE_TAG_RENAME_DIALOG, OPEN_TAG_RENAME_DIALOG, TagRenameActions } from "../../root/pages/dashboard/actions";
import { IUiState } from "./IUiState";
import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
    SET_FILTER,
    SET_LISTING_TYPES_FOR_FILTER,
    SET_ROUTE,
    SET_TAGS_FOR_FILTER,
    SOCKET_CONNECTED,
    SOCKET_CONNECTING,
    SOCKET_DISCONNECTED,
    UiActionTypes,
} from "./uiActions";

export enum SocketStatus {
    connected,
    connecting,
    disconnected,
}

export const INITIAL_STATE: IUiState = {
    drawerOpen: false,
    filter: {
        listingTypes: {
            blogPosts: false,
            projects: false,
        },
        searchText: "",
        tagIds: [],
    },
    route: "/",
    socketStatus: SocketStatus.disconnected,
    tagRenameDialog: { tagRenameDialogOpen: false, existingTagId: null },
    uri: "/",
};

export const uiReducer = (state = INITIAL_STATE, action: UiActionTypes | TagRenameActions): IUiState => {
    switch (action.type) {
        case OPEN_TAG_RENAME_DIALOG: {
            return { ...state, tagRenameDialog: { ...state.tagRenameDialog, tagRenameDialogOpen: true } };
        }
        case CLOSE_TAG_RENAME_DIALOG: {
            return { ...state, tagRenameDialog: { ...state.tagRenameDialog, tagRenameDialogOpen: false } };
        }
        case SOCKET_CONNECTED: {
            return { ...state, socketStatus: SocketStatus.connected };
        }
        case SOCKET_DISCONNECTED: {
            return { ...state, socketStatus: SocketStatus.disconnected };
        }
        case SOCKET_CONNECTING: {
            return { ...state, socketStatus: SocketStatus.connecting };
        }
        case OPEN_DRAWER: {
            return { ...state, drawerOpen: true };
        }
        case CLOSE_DRAWER: {
            return { ...state, drawerOpen: false };
        }
        case SET_ROUTE: {
            return {
                ...state,
                route: action.payload.route,
                uri: action.payload.uri,
            };
        }
        case SET_FILTER: {
            const { payload: filter } = action;
            return { ...state, filter };
        }
        case SET_TAGS_FOR_FILTER: {
            const { payload: tagIds } = action;
            return { ...state, filter: { ...state.filter, tagIds } };
        }
        case SET_LISTING_TYPES_FOR_FILTER: {
            const { payload: listingTypes } = action;
            return { ...state, filter: { ...state.filter, listingTypes } };
        }
        default:
            return state;
    }
};
