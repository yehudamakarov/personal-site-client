import {
    Card,
    createStyles,
    Grid,
    GridListTile,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import { IBlogPost } from "../../../../store/blogPost/types";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             padding: theme.spacing(1),
//         },
//     })
// );
interface IOwnProps {
    blogPost: IBlogPost;
}

export const BlogPostByProjectComponent = (props: IOwnProps) => {
    const { blogPost } = props;
    // const classes = useStyles();
    return (
        <Card square>
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
};
