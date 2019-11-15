import { Grid } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProject } from "../../../store/actions/projects/api";
import { getProjectByNameLoadingAction } from "../../../store/actions/projects/data/getProjectByName/actions";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { BlogPostsByProjectList } from "./components/blogPostsByProjectList";
import { ProjectPageTitleCard } from "./components/projectTitleCard";
import TagsComponent from "./components/tagsComponent";


const ProjectPage = (props: RouteComponentProps<{ projectName?: string }>) => {
    const dispatch = useDispatch();
    const { projectName: projectNameFromRoute } = props;

    const projectFromRoute: IProject | undefined = useSelector(
        (state: IApplicationState) => {
            return state.projects.projectsData.find((project) => {
                return project.projectName === props.projectName;
            });
        },
    );

    useEffect(() => {
        if (!projectFromRoute) {
            dispatch(getProjectByNameLoadingAction(projectNameFromRoute));
        }
    }, [projectNameFromRoute]);

    return (
        <BasePage>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProjectPageTitleCard
                        projectNameFromRoute={projectNameFromRoute}
                        project={projectFromRoute}
                    />
                </Grid>
                {/* Tags */}
                <Grid item xs={12}>
                    <TagsComponent
                        project={projectFromRoute}
                        tags={projectFromRoute ? projectFromRoute.tagIds : []}
                    />
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
