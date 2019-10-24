import { Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterHelpers } from "../../../helpers/filterHelpers";
import { getBlogPostsLoadingAction } from "../../../store/actions/blogPost/getBlogPosts/actions";
import { getProjectsLoadingAction } from "../../../store/actions/projects/getProjects/actions";
import { IApplicationState } from "../../../store/rootReducer";
import { IFilter } from "../../../store/ui/IUiState";
import IndexViewCard from "./indexViewCard";

const IndexViewList = (props: IFilter) => {
    const { listingTypes, searchText, tagIds } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectsLoadingAction());
        dispatch(getBlogPostsLoadingAction());
    }, []);

    const filteredBlogPosts = useSelector((state: IApplicationState) => {
        if (listingTypes.blogPosts) {
            return state.blogPosts.blogPostData.filter((blogPost) => {
                const titleContainsSearchText = FilterHelpers.getTitleContainsSearchText(
                    blogPost.title,
                    searchText,
                );
                const tagsContainAHighlightedTag = FilterHelpers.getTagsContainAHighlightedTag(
                    tagIds,
                    blogPost.tagIds,
                );
                return titleContainsSearchText && tagsContainAHighlightedTag;
            });
        } else {
            return [];
        }
    }, _.isEqual);

    const filteredProjects = useSelector((state: IApplicationState) => {
        if (!listingTypes.projects) {
            return [];
        } else {
            return state.projects.projectsData.filter((project) => {
                const titleContainsSearchText = FilterHelpers.getTitleContainsSearchText(
                    project.projectName,
                    searchText,
                );
                const tagsContainAHighlightedTag = FilterHelpers.getTagsContainAHighlightedTag(
                    tagIds,
                    project.tagIds,
                );
                return titleContainsSearchText && tagsContainAHighlightedTag;
            });
        }
    }, _.isEqual);

    const getCards = () => {
        const blogPostCards = filteredBlogPosts
            ? filteredBlogPosts.map((blogPost) => {
                return (
                    <IndexViewCard
                        type="blogPost"
                        githubLink={null}
                        regularLink={`/blogPosts/${blogPost.slug}`}
                        key={blogPost.id}
                        title={blogPost.title}
                        subTitle={blogPost.description}
                        tagIds={blogPost.tagIds}
                    />
                );
            })
            : [];

        const projectCards = filteredProjects
            ? filteredProjects.map((project) => {
                return (
                    <IndexViewCard
                        type="project"
                        githubLink={project.githubUrl}
                        regularLink={`/projects/${project.slug}`}
                        key={project.githubRepoDatabaseId}
                        title={project.projectTitle}
                        subTitle={project.projectDescription}
                        tagIds={project.tagIds}
                    />
                );
            })
            : [];

        const allCards = blogPostCards.concat(projectCards);
        return allCards;
    };

    return (
        <Grid
            justify="flex-start"
            direction="row"
            alignItems="stretch"
            container
            spacing={4}
        >
            {getCards().map((card, i) => {
                return (
                    <Grid xs={12} md={6} lg={4} key={i} item>
                        {card}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default IndexViewList;
