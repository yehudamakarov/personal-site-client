import {
    createStyles,
    LinearProgress,
    makeStyles,
    Theme,
    Typography,
    useTheme,
} from "@material-ui/core";

import { Grid } from "mauerwerk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SizeMeProps, withSize } from "react-sizeme";
import { animated, useSpring } from "react-spring";
import { IBlogPost } from "../../../../store/actions/blogPost/api";
import { getBlogPostsByProjectIdLoadingAction } from "../../../../store/actions/blogPost/getBlogPostsByProjectId/actions";
import { IProject } from "../../../../store/actions/projects/api";
import { IApplicationState } from "../../../../store/rootReducer";
import { BlogPostByProjectComponent } from "./blogPostByProjectComponent";

interface IOwnProps extends SizeMeProps {
    project?: IProject;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardsGrid: {
            marginLeft: -theme.spacing(2),
            marginRight: -theme.spacing(2),
        },
        progress: {
            margin: theme.spacing(1),
        },
        title: {},
    })
);

const AnimatedLinearProgress = animated(LinearProgress);

export const BlogPostsByProjectList = withSize({
    monitorHeight: false,
    monitorWidth: true,
})((props: IOwnProps) => {
    const { project, size } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const blogPostsForProject = useSelector((state: IApplicationState) => {
        if (project) {
            return state.blogPosts.blogPostData.filter((blogPost) => {
                return blogPost.projectId === project.githubRepoDatabaseId;
            });
        } else {
            return [];
        }
    });

    const blogPostsAreLoading = useSelector((state: IApplicationState) => {
        return (
            state.blogPosts.blogPostUi.allIsLoading &&
            blogPostsForProject.length === 0
        );
    });

    useEffect(() => {
        if (project) {
            dispatch(
                getBlogPostsByProjectIdLoadingAction(
                    project.githubRepoDatabaseId
                )
            );
        }
    }, [project]);

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
            return { ...prevState, [blogPostId]: height };
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

    const { display, opacity } = useSpring({
        display: blogPostsAreLoading ? "block" : "none",
        opacity: blogPostsAreLoading ? 1 : 0,
    });

    return (
        <div>
            <AnimatedLinearProgress
                className={classes.progress}
                style={{
                    display,
                    opacity,
                }}
                variant="query"
            />
            {/*todo make animation*/}
            {blogPostsForProject.length > 0 && (
                <div className={classes.title}>
                    <Typography variant="h5">
                        Posts About This Project
                    </Typography>
                </div>
            )}
            <div className={classes.cardsGrid}>
                <Grid
                    heights={calculateHeights}
                    data={blogPostsForProject}
                    keys={calculateKeys}
                    columns={columns}
                    margin={theme.spacing(2)}
                    lockScroll={true}
                    transitionMount={false}
                >
                    {(data: IBlogPost) => (
                        <BlogPostByProjectComponent
                            blogPost={data}
                            setSingleHeight={setSingleHeight}
                        />
                    )}
                </Grid>
            </div>
        </div>
    );
});
