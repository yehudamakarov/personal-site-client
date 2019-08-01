import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Typography } from '@material-ui/core';

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
        <Typography variant="h6" className={classes.iconPush}>YM</Typography>
    )
}
