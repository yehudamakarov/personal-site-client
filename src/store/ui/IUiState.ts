export interface IFilterListingTypes {
    projects: boolean;
    blogPosts: boolean;
    [index: string]: boolean;
}

// make a separate type for each string (like actions)

export class Routes {
    public static projects: "projects" = "projects";
    public static blogPosts: "blogPosts" = "blogPosts";
    public static tagsTagIdParam: "tags/:tagId" = "tags/:tagId";
    public static home: "/" = "/";
    public static about: "about" = "about";
    public static projectsProjectNameParam: "projects/:projectName" =
        "projects/:projectName";
}

export type IndexTypeRoute = "projects" | "blogPosts" | "tags/:tagId";

export type Route = IndexTypeRoute | "/" | "about" | "projects/:projectName";

export interface IFilter {
    searchText: string;
    listingTypes: IFilterListingTypes;
    tagIds: string[];
}

export interface IUiState {
    drawerOpen: boolean;
    route: Route;
    filter: IFilter;
}
