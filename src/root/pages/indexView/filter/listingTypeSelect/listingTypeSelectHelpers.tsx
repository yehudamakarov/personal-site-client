import { IFilterListingTypes, IndexTypeRoute } from "../../../../../store/ui/IUiState";

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

    return (selected as ["projects", "blogPosts"])
        .map(beautifyListingType)
        .join(", ");
};

export const getFilterListTypesFromPath = (
    path: IndexTypeRoute,
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
