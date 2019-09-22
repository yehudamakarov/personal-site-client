import { Card, Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogPostsLoadingAction } from "../../../store/blogPost/actions/getBlogPosts";
import { getProjectsLoadingAction } from "../../../store/projects/actions/getProjects";
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
                const titleContainsSearchText =
                    blogPost.title
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) !== -1;
                const tagsContainAHighlightedTag =
                    tagIds.length > 0
                        ? blogPost.tagIds.some((tag) =>
                              tagIds.some((tagId) => tagId === tag)
                          )
                        : true;

                return titleContainsSearchText && tagsContainAHighlightedTag;
            });
        } else {
            return [];
        }
    }, _.isEqual);

    const filteredProjects = useSelector((state: IApplicationState) => {
        if (listingTypes.projects) {
            return state.projects.projectsData.filter((project) => {
                const titleContainsSearchText =
                    project.projectName
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) !== -1;
                // const tagsContainAHighlightedTag = project.tagIds.some((tag) =>
                //     tagIds.some((tagId) => tagId === tag)
                // );
                return titleContainsSearchText;
                // && tagsContainAHighlightedTag;
            });
        } else {
            return [];
        }
    }, _.isEqual);

    const blogPostCards = filteredBlogPosts
        ? filteredBlogPosts.map((blogPost) => {
              return (
                  <IndexViewCard
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
                      key={project.githubRepoDatabaseId}
                      title={project.projectTitle}
                      subTitle={project.projectDescription}
                      tagIds={project.tagIds}
                  />
              );
          })
        : [];

    const allCards = blogPostCards.concat(projectCards);
    return (
        <Grid
            justify="space-around"
            direction="row"
            alignItems="stretch"
            container
            spacing={4}
        >
            {allCards.map((card, i) => {
                return (
                    <Grid xs={12} sm={6} md={4} key={i} item>
                        {card}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default IndexViewList;
