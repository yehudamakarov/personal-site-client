export interface IFilterListingTypes {
    projects: boolean;
    blogPosts: boolean;

    [index: string]: boolean;
}

type ProjectsRoute = "projects";
type BlogPostsRoute = "blogPosts";
type TagsTagIdRoute = "tags/:tagId";
type HomeRoute = "/";
type AboutRoute = "about";
type ProjectsProjectNameRoute = "projects/:projectName";

export type IndexTypeRoute = ProjectsRoute | BlogPostsRoute | TagsTagIdRoute;
export type Route =
    | IndexTypeRoute
    | HomeRoute
    | AboutRoute
    | ProjectsProjectNameRoute;

export class Routes {
    public static projects: ProjectsRoute = "projects";
    public static blogPosts: BlogPostsRoute = "blogPosts";
    public static tagsTagIdParam: TagsTagIdRoute = "tags/:tagId";
    public static home: HomeRoute = "/";
    public static about: AboutRoute = "about";
    public static projectsProjectNameParam: ProjectsProjectNameRoute =
        "projects/:projectName";
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
}
