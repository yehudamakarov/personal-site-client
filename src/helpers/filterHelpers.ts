import { IApplicationState } from "../store/rootReducer";
import { IFilter, IFilterListingTypes } from "../store/ui/IUiState";

interface ITaggable {
    tagIds: string[];
}

export class FilterHelpers {

    public static filterIndexEntities<T>(
        filter: IFilter,
        whichListingType: (filterListingTypes: IFilterListingTypes) => boolean,
        whichDataSlice: (state: IApplicationState) => Array<T & ITaggable>,
        whichPropertyToTextSearch: (entity: T) => string,
    ) {
        return (state: IApplicationState) => {
            if (!whichListingType(filter.listingTypes)) {
                return [];
            } else {
                return whichDataSlice(state).filter((entity) => {
                    const titleContainsSearchText = this.getTitleContainsSearchText(
                        whichPropertyToTextSearch(entity),
                        filter.searchText,
                    );
                    const tagsContainAHighlightedTag = this.getTagsContainAHighlightedTag(
                        filter.tagIds,
                        entity.tagIds,
                    );
                    return (
                        titleContainsSearchText && tagsContainAHighlightedTag
                    );
                });
            }
        };
    }

    private static getTitleContainsSearchText(
        name: string,
        searchText: string,
    ) {
        return name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }

    private static getTagsContainAHighlightedTag(
        selectedTagIds: string[],
        containedTagIds: string[],
    ) {
        return selectedTagIds.length > 0
            ? containedTagIds
                ? containedTagIds.some((tag) =>
                    selectedTagIds.some((tagId) => tagId === tag)
                )
                : false
            : true;
    }
}
