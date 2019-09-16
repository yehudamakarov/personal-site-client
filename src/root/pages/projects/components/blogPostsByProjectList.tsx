import {
    Card,
    createStyles,
    GridList,
    LinearProgress,
    makeStyles,
    Theme,
    Typography,
    useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "mauerwerk";
import { getBlogPostsByProjectIdLoadingAction } from "../../../../store/blogPost/actions/getBlogPostsByProjectId";
import { IBlogPost } from "../../../../store/blogPost/types";
import { IProject } from "../../../../store/projects/types";
import { IApplicationState } from "../../../../store/rootReducer";
import { BlogPostByProjectComponent } from "./blogPostByProjectComponent";
interface IOwnProps {
    project?: IProject;
}

export const BlogPostsByProjectList = (props: IOwnProps) => {
    const { project } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        if (project) {
            dispatch(
                getBlogPostsByProjectIdLoadingAction(
                    project.githubRepoDatabaseId
                )
            );
        }
    }, [project]);
    const blogPostsAreLoading = useSelector((state: IApplicationState) => {
        return state.blogPosts.blogPostUi.allIsLoading;
    });
    const blogPostsForProject = useSelector((state: IApplicationState) => {
        if (project) {
            return state.blogPosts.blogPostData.filter((blogPost) => {
                return blogPost.projectId === project.githubRepoDatabaseId;
            });
        } else {
            return [];
        }
    });

    return (
        <div>
            <div>
                <Typography variant="h5">Posts for this project:</Typography>
            </div>
            <div>
                <Grid
                    heights={200}
                    data={blogPostsForProject}
                    keys={(d: IBlogPost) => d.id}
                    columns={2}
                    margin={0}
                    lockScroll={false}
                    closeDelay={500}
                    transitionMount={true}
                >
                    {(data: IBlogPost, open: any, toggle: any) => (
                        <Card>
                            {data.title}
                            {open && <div>Opened/maximized content here</div>}
                            <button onClick={toggle}>
                                {open ? "Close" : "Open"}
                            </button>
                        </Card>
                    )}
                </Grid>
            </div>
        </div>
    );
};
