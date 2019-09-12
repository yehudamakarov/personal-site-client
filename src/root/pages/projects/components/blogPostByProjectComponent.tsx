import { Typography } from "@material-ui/core";
import React from "react";
import { IBlogPost } from "../../../../store/blogPost/types";

interface IOwnProps {
    blogPost: IBlogPost;
}

export const BlogPostByProjectComponent = (props: IOwnProps) => {
    const { blogPost } = props;
    return (
        <Typography key={blogPost.title} variant="subtitle1">
            {blogPost.title}
        </Typography>
    );
};
