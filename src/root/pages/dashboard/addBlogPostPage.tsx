import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    }),
);

export const AddBlogPostPage = (props: RouteComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h4>AddBlogPost</h4>
        </div>
    );
};