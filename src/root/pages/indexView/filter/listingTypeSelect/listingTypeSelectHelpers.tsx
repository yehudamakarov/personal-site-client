import { IFilterListingTypes } from "../../../../../store/ui/IUiState";

export const getArrayOfListingTypesSelected = (
    filterListingTypes: IFilterListingTypes,
) => {
    const listingTypeKeys: string[] = Object.keys(filterListingTypes);
    return listingTypeKeys.reduce(
        (agg, el) => {
            if (filterListingTypes[el]) {
                agg.push(el);
            }
            return agg;
        },
        [] as string[],
    );
};

export const getSelectedAsDisplayString = (selected: any) => {
    const beautifyListingType = (
        listingType: "projects" | "blogPosts" | "tags",
    ) => {
        switch (listingType) {
            case "projects":
                return "Projects";
            case "blogPosts":
                return "Blog Posts";
            case "tags":
                return "Tags";
            default:
                break;
        }
    };

    return (selected as ["projects", "blogPosts", "tags"])
        .map(beautifyListingType)
        .join(", ");
};

export const getFilterListTypesFromPath = (
    path: "projects" | "blogPosts" | "tags",
    filterListingTypes: IFilterListingTypes,
) => {
    const cleanedFilterListTypes: any = {};
    const clearListingTypesNotSelected = (listingTypeKey: string) => {
        if (listingTypeKey !== path) {
            cleanedFilterListTypes[listingTypeKey] = false;
        }
    };

    Object.keys(filterListingTypes).forEach(clearListingTypesNotSelected);
    return {
        ...cleanedFilterListTypes,
        [path]: true,
    };
};

export const getNewListingTypes = (
    selectedValues: string[],
    filterListingTypes: IFilterListingTypes,
) => {
    const newListingTypes: IFilterListingTypes = { ...filterListingTypes };
    for (const listingType in filterListingTypes) {
        if (filterListingTypes.hasOwnProperty(listingType)) {
            newListingTypes[listingType] = selectedValues.includes(listingType);
        }
    }
    return newListingTypes;
};
