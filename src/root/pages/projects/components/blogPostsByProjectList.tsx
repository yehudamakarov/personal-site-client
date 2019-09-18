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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sizeHeight } from "@material-ui/system";
import { throttle } from "lodash";
import { Grid } from "mauerwerk";
import { SizeMeProps, withSize } from "react-sizeme";
import { animated, useSpring } from "react-spring";
import { getBlogPostsByProjectIdLoadingAction } from "../../../../store/blogPost/actions/getBlogPostsByProjectId";
import { IBlogPost } from "../../../../store/blogPost/types";
import { IProject } from "../../../../store/projects/types";
import { IApplicationState } from "../../../../store/rootReducer";
import { BlogPostByProjectComponent } from "./blogPostByProjectComponent";

interface IOwnProps extends SizeMeProps {
    project?: IProject;
}

const AnimatedLinearProgress = animated(LinearProgress);

export const BlogPostsByProjectList = withSize({
    monitorHeight: false,
    monitorWidth: true,
})((props: IOwnProps) => {
    const { project, size } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

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

    const [cellHeights, setCellHeights] = useState(
        blogPostsForProject.reduce(
            (result: { [index: string]: number }, blogPost) => {
                result[blogPost.id] = 200;
                return result;
            },
            {} as { [index: string]: number }
        )
    );

    const setSingleHeight = (blogPostId: string, height: number) => {
        setCellHeights((prevState) => {
            const newState = { ...prevState, [blogPostId]: height };
            return newState;
        });
    };

    const calculateHeights = (d: IBlogPost) => {
        const num = cellHeights[d.id];
        return num ? num : 300;
    };

    const calculateKeys = (d: IBlogPost) => d.id;

    const columns = size.width
        ? size.width >= theme.breakpoints.width("sm")
            ? 2
            : 1
        : 2;

    const { opacity } = useSpring({
        from: { opacity: 0 },
        opacity: blogPostsAreLoading ? 0 : 1,
    });

    return (
        <div>
            <div>
                <Typography variant="h5">Posts for this project:</Typography>
            </div>
            <div>
                {blogPostsAreLoading ? (
                    <AnimatedLinearProgress
                        style={{
                            opacity: opacity.interpolate((o) => {
                                return 1 - (o as number);
                            }),
                        }}
                        variant="query"
                    />
                ) : (
                    <Grid
                        heights={calculateHeights}
                        data={blogPostsForProject}
                        keys={calculateKeys}
                        columns={columns}
                        margin={32}
                        lockScroll={true}
                        transitionMount={true}
                    >
                        {(data: IBlogPost, open: any, toggle: any) => (
                            <BlogPostByProjectComponent
                                blogPost={data}
                                setSingleHeight={setSingleHeight}
                            />
                        )}
                    </Grid>
                )}
            </div>
        </div>
    );
});
