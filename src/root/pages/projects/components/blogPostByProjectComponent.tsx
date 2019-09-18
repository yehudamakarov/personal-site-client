import {
    Card,
    createStyles,
    Grid,
    GridListTile,
    makeStyles,
    Theme,
    Typography,
    useTheme,
} from "@material-ui/core";
import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { SizeMeProps, withSize } from "react-sizeme";
import { IBlogPost } from "../../../../store/blogPost/types";

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

export const BlogPostByProjectComponent = React.memo(withSize({
    monitorHeight: true,
    monitorWidth: false,
})((props: IOwnProps) => {
    const { blogPost, setSingleHeight, size } = props;
    const classes = useStyles();
    const memo = useCallback(() => {
        console.log("memo fired")
        if (size.height) {
            setSingleHeight(blogPost.id, size.height);
        }
    }, [size.height]);
    useLayoutEffect(() => {
        memo();
    }, [size.height]);
    console.log("redering single cell");
    return (
        <Card className={classes.root} square>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Typography variant="h6">{blogPost.title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                        {blogPost.description}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}));
