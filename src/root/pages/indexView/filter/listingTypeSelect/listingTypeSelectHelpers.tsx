import { IFilterListingTypes, IndexTypeRoute, Routes } from "../../../../../store/ui/IUiState";

export const getArrayOfListingTypesSelected = (filterListingTypes: IFilterListingTypes) => {
    const listingTypeKeys: string[] = Object.keys(filterListingTypes);
    return listingTypeKeys.reduce((agg, el) => {
        if (filterListingTypes[el]) {
            agg.push(el);
        }
        return agg;
    }, [] as string[]);
};

export const getSelectedAsDisplayString = (selected: any) => {
    type Selected = ["projects", "blogPosts"] & [];
    const beautifyListingType = (listingType: "projects" | "blogPosts") => {
        switch (listingType) {
            case "projects":
                return "Projects";
            case "blogPosts":
                return "Blog Posts";
            default:
                break;
        }
    };

    if ((selected as Selected).length === 0) {
        return "None Selected";
    }
    return (selected as Selected).map(beautifyListingType).join(", ");
};

export const getFilterListTypesFromPath = (path: IndexTypeRoute, filterListingTypes: IFilterListingTypes) => {
    if (path === Routes.tagsTagIdParam || path === Routes.tags) {
        return {
            blogPosts: true,
            projects: true,
        };
    }
    const cleanedFilterListTypes: any = {};
    const clearListingTypesNotSelected = (listingTypeKey: string) => {
        if (listingTypeKey !== path.replace(/\//g, "")) {
            cleanedFilterListTypes[listingTypeKey] = false;
        }
    };

    Object.keys(filterListingTypes).forEach(clearListingTypesNotSelected);
    return {
        ...cleanedFilterListTypes,
        [path.replace(/\//g, "")]: true,
    };
};

export const getNewListingTypes = (selectedValues: string[], filterListingTypes: IFilterListingTypes) => {
    const newListingTypes: IFilterListingTypes = { ...filterListingTypes };
    for (const listingType in filterListingTypes) {
        if (filterListingTypes.hasOwnProperty(listingType)) {
            newListingTypes[listingType] = selectedValues.includes(listingType);
        }
    }
    return newListingTypes;
};
