export class FilterHelpers {
    public static getTitleContainsSearchText(name: string, searchText: string) {
        return name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }

    public static getTagsContainAHighlightedTag(
        selectedTagIds: string[],
        containedTagIds: string[],
    ) {
        return selectedTagIds.length > 0
            ? containedTagIds
                ? containedTagIds.some((tag) =>
                    selectedTagIds.some((tagId) => tagId === tag),
                )
                : false
            : true;
    }
}