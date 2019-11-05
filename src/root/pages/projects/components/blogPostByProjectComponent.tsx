/* eslint-disable react-hooks/exhaustive-deps */
import { Card, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useLayoutEffect } from "react";
import { SizeMeProps, withSize } from "react-sizeme";
import { IBlogPost } from "../../../../store/actions/blogPost/api";
import TagsComponent from "./tagsComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
        },
    })
);

interface IOwnProps extends SizeMeProps {
    blogPost: IBlogPost;
    setSingleHeight: (blogPostId: string, height: number) => void;
}

export const BlogPostByProjectComponent = React.memo(
    withSize({
        monitorHeight: true,
        monitorWidth: false,
    })((props: IOwnProps) => {
        const { blogPost, setSingleHeight, size } = props;
        const classes = useStyles();
        const memo = useCallback(() => {
            if (size.height) {
                setSingleHeight(blogPost.id, size.height);
            }
        }, [size.height]);
        useLayoutEffect(() => {
            memo();
        }, [size.height]);
        return (
            <Card className={classes.root} square>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h6">{blogPost.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            {blogPost.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TagsComponent small rtl tags={blogPost.tagIds} />
                    </Grid>
                </Grid>
            </Card>
        );
    })
);
