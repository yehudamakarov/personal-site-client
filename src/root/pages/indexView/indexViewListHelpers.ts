import { FilterHelpers } from "../../../helpers/filterHelpers";
import { IApplicationState } from "../../../store/rootReducer";
import { IFilter } from "../../../store/ui/IUiState";

export const filterProjects = (filter: IFilter) => (
    state: IApplicationState
) => {
    if (!filter.listingTypes.projects) {
        return [];
    } else {
        return state.projects.projectsData.filter((project) => {
            const titleContainsSearchText = FilterHelpers.getTitleContainsSearchText(
                project.projectName,
                filter.searchText
            );
            const tagsContainAHighlightedTag = FilterHelpers.getTagsContainAHighlightedTag(
                filter.tagIds,
                project.tagIds
            );
            return titleContainsSearchText && tagsContainAHighlightedTag;
        });
    }
};

export const filterBlogPosts = (filter: IFilter) => (
    state: IApplicationState
) => {
    if (!filter.listingTypes.blogPosts) {
        return [];
    } else {
        return state.blogPosts.blogPostData.filter((blogPost) => {
            const titleContainsSearchText = FilterHelpers.getTitleContainsSearchText(
                blogPost.title,
                filter.searchText
            );
            const tagsContainAHighlightedTag = FilterHelpers.getTagsContainAHighlightedTag(
                filter.tagIds,
                blogPost.tagIds
            );
            return titleContainsSearchText && tagsContainAHighlightedTag;
        });
    }
};
