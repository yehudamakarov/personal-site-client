import { SocketStatus } from "./uiReducer";

export type ProjectsRoute = "/projects/";
export type BlogPostsRoute = "/blogPosts/";
export type TagsTagIdParamRoute = "/tags/:tagId/";
export type HomeRoute = "/";
export type AboutRoute = "/about/";
export type ProjectsProjectNameParamRoute = "/projects/:projectName/";
export type TagsRoute = "/tags/";
export type LoginRoute = "/login/";
export type TestRoute = "/test/";
export type DashboardRoute = "/dashboard/";
export type DashboardTagsRoute = "/dashboard/tags/";
export type DashboardTagsMapRoute = "/dashboard/tags/map/";
export type DashboardTagsMapParamRoute = "/dashboard/tags/map/:tagId/";

export type IndexTypeRoute = ProjectsRoute | BlogPostsRoute | TagsTagIdParamRoute | TagsRoute;
export type Route = IndexTypeRoute | HomeRoute | AboutRoute | ProjectsProjectNameParamRoute;

export class Routes {
    public static projects: ProjectsRoute = "/projects/";
    public static blogPosts: BlogPostsRoute = "/blogPosts/";
    public static tagsTagIdParam: TagsTagIdParamRoute = "/tags/:tagId/";
    public static home: HomeRoute = "/";
    public static about: AboutRoute = "/about/";
    public static projectsProjectNameParam: ProjectsProjectNameParamRoute = "/projects/:projectName/";
    public static tags: TagsRoute = "/tags/";
    public static login: LoginRoute = "/login/";
    public static test: TestRoute = "/test/";

    public static dashboard: DashboardRoute = "/dashboard/";
    public static dashboardTags: DashboardTagsRoute = "/dashboard/tags/";
    public static dashboardTagsMap: DashboardTagsMapRoute = "/dashboard/tags/map/";
    public static dashboardTagsMapTagIdParam: DashboardTagsMapParamRoute = "/dashboard/tags/map/:tagId/";
}

export interface IFilterListingTypes {
    projects: boolean;
    blogPosts: boolean;

    [index: string]: boolean;
}

export interface IFilter {
    searchText: string;
    listingTypes: IFilterListingTypes;
    tagIds: string[];
}

export interface IUiState {
    drawerOpen: boolean;
    route: Route;
    uri: string | undefined;
    filter: IFilter;
    socketStatus: SocketStatus;
    tagRenameDialogOpen: boolean;
}
