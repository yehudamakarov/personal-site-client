import { createStyles, Link, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "@reach/router";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconPush: {
            flexGrow: 1,
        },
    })
);
export const BrandLogo = () => {
    const classes = useStyles();

    return (
        <Link
            color="inherit"
            component={RouterLink}
            to="/"
            variant="h6"
            className={classes.iconPush}
        >
            YM
        </Link>
    );
};
