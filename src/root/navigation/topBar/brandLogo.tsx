import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from "@reach/router"

const useStyles = makeStyles((theme: Theme) =>
    createStyles(
        {
            iconPush: {
                flexGrow: 1
            }
        }
    )
)
export const BrandLogo = () => {
    const classes = useStyles();

    return (
        <Link
            color="inherit"
            component={RouterLink}
            to="/"
            variant="h6"
            className={classes.iconPush}>
            YM
        </Link>
    )
}
