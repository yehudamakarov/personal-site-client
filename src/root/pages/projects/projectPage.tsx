import { Grid } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectByNameLoadingAction } from "../../../store/entities/projects/data/actions/getProjectByName/actions";
import { IProject } from "../../../store/entities/projects/ui/actions/api";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { BlogPostsByProjectList } from "./components/blogPostsByProjectList";
import { ProjectPageTitleCard } from "./components/projectTitleCard";
import TagsComponent from "./components/tagsComponent";

const ProjectPage = (props: RouteComponentProps<{ projectName?: string }>) => {
    const dispatch = useDispatch();

    // todo get projectId from project name, pass down to any component that needs project data.
    //      can use a projectId instead.
    //      no need to pass down a project and check it all over the place

    const projectFromRoute: IProject | undefined = useSelector((state: IApplicationState) => {
        return state.projects.projectsData.find((project) => {
            return project.projectName === props.projectName;
        });
    });

    // todo dispatch regardless on every page load. set isLoading.
    //      if isLoading, render a loader instead of all the components.
    useEffect(() => {
        if (!projectFromRoute) {
            dispatch(getProjectByNameLoadingAction(props.projectName));
        }
    }, [props.projectName]);

    return (
        <BasePage>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProjectPageTitleCard projectNameFromRoute={props.projectName} project={projectFromRoute} />
                </Grid>
                {/* Tags */}
                <Grid item xs={12}>
                    <TagsComponent project={projectFromRoute} tags={projectFromRoute ? projectFromRoute.tagIds : []} />
                </Grid>
                {/* Highlights */}

                {/* Post List */}
                <Grid item xs={12}>
                    <BlogPostsByProjectList project={projectFromRoute} />
                </Grid>
            </Grid>
        </BasePage>
    );
};

export default ProjectPage;
