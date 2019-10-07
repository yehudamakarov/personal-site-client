import { Card, Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    return (
        <Grid
            justify="flex-start"
            direction="row"
            alignItems="stretch"
            container
            spacing={4}
        >
            {allCards.map((card, i) => {
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
