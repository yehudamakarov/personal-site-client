import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogPostsByProjectIdLoadingAction } from "../../../store/actions/blogPost/getBlogPostsByProjectId/actions";
import { IProject } from "../../../store/actions/projects/api";
import { getProjectByNameLoadingAction } from "../../../store/actions/projects/getProjectByName/actions";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { BlogPostsByProjectList } from "./components/blogPostsByProjectList";
import ProjectPageTitle from "./components/projectPageTitle";

interface IOwnProps extends RouteComponentProps<{ projectName?: string }> {}

const ProjectPage = (props: IOwnProps) => {
    const dispatch = useDispatch();
    const { projectName: projectNameFromRoute } = props;

    const currentProject: IProject | undefined = useSelector(
        (state: IApplicationState) => {
            return state.projects.projectsData.find((project) => {
                return project.projectName === props.projectName;
            });
        }
    );

    useEffect(() => {
        if (!currentProject) {
            dispatch(getProjectByNameLoadingAction(projectNameFromRoute));
        }
    }, [projectNameFromRoute]);

    const currentProjectName = currentProject
        ? currentProject.projectName
        : projectNameFromRoute;

    const currentProjectDescription = currentProject
        ? currentProject.projectDescription
        : "";

    return (
        <BasePage>
            <Grid container spacing={4}>
                {/* Title */}
                <Grid item xs={12}>
                    <ProjectPageTitle
                        currentProjectName={currentProjectName}
                        projectNameFromRoute={projectNameFromRoute}
                    />
                </Grid>
                {/* Highlights */}
                {/* Tags */}

                {/* About */}
                <Grid item xs={12}>
                    <Typography variant="h5">Description</Typography>
                    <Typography variant="body1">
                        {currentProjectDescription}
                    </Typography>
                </Grid>
                {/* Post List */}
                <Grid item xs={12}>
                    <BlogPostsByProjectList project={currentProject} />
                </Grid>
            </Grid>
        </BasePage>
    );
};

export default ProjectPage;
