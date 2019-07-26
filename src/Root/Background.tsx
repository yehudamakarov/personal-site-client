import React from "react";
import { Backdrop, Typography, makeStyles, createStyles, Paper, Theme } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles((theme: Theme) =>
    createStyles(
        {
            root: {
                backgroundColor: theme.palette.background.paper,
                bottom: 0,
                right: 0,
                top: 0,
                left: 0,
                position: "fixed",
                zIndex: -10
            }
        }
    )
)

function Background() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Paper className={classes.root} />
        </React.Fragment>
    )
}

export default Background