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


export const BlogPostsByProjectList = (props: IOwnProps) => {
    const theme = useTheme();

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

    const gridItems = blogPostsForProject.map((blogPost, i) => {
        return <div key={i}><Card><Typography variant="h6">{blogPost.title}</Typography></Card></div>;
    });

    return (
        <div >
            <Typography variant="h5">
                Posts for this project:
            </Typography>
            {gridItems}
        </div>
    );
};
