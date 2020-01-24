import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    }),
);

export const TagDeleteDialog = (props: {}) => {
    const classes = useStyles();

    return <div className={classes.root} />;
};
