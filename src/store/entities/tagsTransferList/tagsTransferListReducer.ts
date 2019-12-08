import { IFacade } from "../projects/ui/selectors";
import { ISetCheckedBlogPosts } from "./actions/setCheckedBlogPosts";
import { ISetCheckedProjects } from "./actions/setCheckedProjects";
import { ISetLeftBlogPosts } from "./actions/setLeftBlogPosts";
import { ISetLeftProjects } from "./actions/setLeftProjects";
import { ISetRightBlogPosts } from "./actions/setRightBlogPosts";
import { ISetRightProjects } from "./actions/setRightProjects";

export interface ITagsTransferListState {
    blogPosts: {
        checked: IFacade[];
        right: IFacade[];
        left: IFacade[];
    };
    projects: {
        checked: IFacade[];
        right: IFacade[];
        left: IFacade[];
    };
}

const INITIAL_STATE: ITagsTransferListState = {
    blogPosts: {
        checked: [],
        left: [],
        right: [],
    },
    projects: {
        checked: [],
        left: [],
        right: [],
    },
};

type TagsTransferListActionTypes =
    | ISetCheckedProjects
    | ISetRightProjects
    | ISetLeftProjects
    | ISetCheckedBlogPosts
    | ISetRightBlogPosts
    | ISetLeftBlogPosts;

export const tagsTransferListReducer = (
    state: ITagsTransferListState = INITIAL_STATE,
    action: TagsTransferListActionTypes
): ITagsTransferListState => {
    switch (action.type) {
        case "SET_CHECKED_BLOG_POSTS":
            return { ...state, blogPosts: { ...state.blogPosts, checked: action.payload } };
        case "SET_RIGHT_BLOG_POSTS":
            return { ...state, blogPosts: { ...state.blogPosts, right: action.payload } };
        case "SET_LEFT_BLOG_POSTS":
            return { ...state, blogPosts: { ...state.blogPosts, left: action.payload } };
        case "SET_CHECKED_PROJECTS":
            return { ...state, projects: { ...state.projects, checked: action.payload } };
        case "SET_RIGHT_PROJECTS":
            return { ...state, projects: { ...state.projects, right: action.payload } };
        case "SET_LEFT_PROJECTS":
            return { ...state, projects: { ...state.projects, left: action.payload } };
        default:
            return state;
    }
};
