import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogPostsByProjectIdLoadingAction } from "../../../store/blogPost/actions/getBlogPostsByProjectId";
import { getProjectByNameLoadingAction } from "../../../store/projects/actions/getProjectByName";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { BlogPostsByProjectList } from "./components/blogPostsByProjectList";

interface IOwnProps extends RouteComponentProps<{ projectName?: string }> {}

const ProjectPage = (props: IOwnProps) => {
    const dispatch = useDispatch();
    const { projectName: projectNameFromRoute } = props;
    const currentProject = useSelector((state: IApplicationState) => {
        return state.projects.projectsData.find((project) => {
            return project.projectName === props.projectName;
        });
    });
    const projectIsLoading = useSelector((state: IApplicationState) => {
        if (projectNameFromRoute) {
            return state.projects.projectsUi.singleIsLoading[
                projectNameFromRoute
            ];
        } else {
            return false;
        }
    });

    useEffect(() => {
        dispatch(getProjectByNameLoadingAction(projectNameFromRoute));
    }, [projectNameFromRoute]);

    return (
        <BasePage>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    {projectIsLoading ? (
                        <LinearProgress variant="query" />
                    ) : (
                        <Typography variant="h3">
                            {currentProject
                                ? currentProject.projectName
                                : projectNameFromRoute}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <BlogPostsByProjectList project={currentProject} />
                </Grid>
            </Grid>
        </BasePage>
    );
};

export default ProjectPage;
