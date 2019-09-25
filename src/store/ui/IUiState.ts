export interface IFilterListingTypes {
    projects: boolean;
    blogPosts: boolean;
    tags: boolean;
}

export interface IFilter {
    searchText: string;
    listingTypes: IFilterListingTypes;
    tagIds: string[];
}

export interface IUiState {
    drawerOpen: boolean;
    filter: IFilter;
}
