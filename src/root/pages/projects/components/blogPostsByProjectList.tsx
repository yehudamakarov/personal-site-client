import {
    Card,
    createStyles,
    LinearProgress,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogPostsByProjectIdLoadingAction } from "../../../../store/blogPost/actions/getBlogPostsByProjectId";
import { IProject } from "../../../../store/projects/types";
import { IApplicationState } from "../../../../store/rootReducer";
import { BlogPostByProjectComponent } from "./blogPostByProjectComponent";

interface IOwnProps {
    project?: IProject;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listDiv: {
            padding: theme.spacing(2),
        },
        listTitle: {
            marginBottom: theme.spacing(2),
        },
    })
);

export const BlogPostsByProjectList = (props: IOwnProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { project } = props;
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
        <Card square className={classes.listDiv}>
            <Typography className={classes.listTitle} variant="h5">
                Posts for this project:
            </Typography>
            {blogPostsAreLoading ? (
                <LinearProgress variant="query" />
            ) : (
                blogPostsForProject.map((blogPost) => {
                    return (
                        <BlogPostByProjectComponent
                            key={blogPost.title}
                            blogPost={blogPost}
                        />
                    );
                })
            )}
        </Card>
    );
};
