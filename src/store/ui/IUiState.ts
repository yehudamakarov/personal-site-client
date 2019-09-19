export interface IFilter {
    searchText: string;
    listingType: "projects" | "blogPosts" | "all";
    tagIds: string[];
}

export interface IUiState {
    drawerOpen: boolean;
    filter: IFilter;
}
