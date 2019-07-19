import React from "react";
import { Backdrop, Typography, makeStyles, createStyles, Paper, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles(
        {
            root: {
                backgroundColor: theme.palette.background.paper,
                bottom: 0,
                right: 0,
                top: 0,
                left: 0,
                position: "fixed"
            }
        }
    )
)

function Root() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Paper className={classes.root} />
        </React.Fragment>
    )
}

export default Root