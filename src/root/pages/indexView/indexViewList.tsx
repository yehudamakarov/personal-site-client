import { Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FilterHelpers } from "../../../helpers/filterHelpers";
import { getBlogPostsLoadingAction } from "../../../store/entities/blogPost/actions/getBlogPosts/actions";
import { getProjectsLoadingAction } from "../../../store/entities/projects/data/actions/getProjects/actions";
import { IProject } from "../../../store/entities/projects/ui/actions/api";
import { IApplicationState } from "../../../store/rootReducer";
import { IFilterListingTypes } from "../../../store/ui/IUiState";
import IndexViewCard from "./indexViewCard";

const IndexViewList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectsLoadingAction());
        dispatch(getBlogPostsLoadingAction());
    }, []);

    const listingTypes = useSelector((state: IApplicationState) => {
        return state.ui.filter.listingTypes;
    }, shallowEqual);

    const searchText = useSelector((state: IApplicationState) => {
        return state.ui.filter.searchText;
    });

    const tagIds = useSelector((state: IApplicationState) => {
        return state.ui.filter.tagIds;
    }, _.isEqual);

    const currentFilter = { listingTypes, searchText, tagIds };

    const filteredBlogPosts = useSelector(
        FilterHelpers.filterIndexEntities(
            currentFilter,
            (filterListingTypes) => filterListingTypes.blogPosts,
            (state) => state.blogPosts.blogPostData,
            (blogPost) => blogPost.title
        ),
        _.isEqual
    );

    const filteredProjects = useSelector(
        FilterHelpers.filterIndexEntities(
            currentFilter,
            (filterListingTypes: IFilterListingTypes) =>
                filterListingTypes.projects,
            (state: IApplicationState) => state.projects.projectsData,
            (project: IProject) => project.projectTitle,
        ),
        _.isEqual
    );

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

        return blogPostCards.concat(projectCards);
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
