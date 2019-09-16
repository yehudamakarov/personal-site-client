import {
    Card,
    createStyles,
    GridList,
    LinearProgress,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpringGrid } from "react-stonecutter";

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
            paddingTop: theme.spacing(2),
        },
        listTitle: {
            marginBottom: theme.spacing(2),
        },
    })
);

const Grid = SpringGrid;

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
    // const blogPostsForProject = useSelector((state: IApplicationState) => {
    //     if (project) {
    //         return state.blogPosts.blogPostData.filter((blogPost) => {
    //             return blogPost.projectId === project.githubRepoDatabaseId;
    //         });
    //     } else {
    //         return [];
    //     }
    // });

    // const gridItems = blogPostsForProject.map((blogPost) => {
    //     return <div />;
    // });

    return (
        <div className={classes.listDiv}>
            <Typography className={classes.listTitle} variant="h5">
                Posts for this project:
            </Typography>
            {blogPostsAreLoading ? (
                <LinearProgress variant="query" />
            ) : (
                <SpringGrid>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => {
                        return <div>{el}</div>;
                    })}
                </SpringGrid>
            )}
        </div>
    );
};
