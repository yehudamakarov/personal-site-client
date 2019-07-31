import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        icon: {
            fill: 'white',
            '&:hover': {
                fill: theme.palette.secondary.light
            }
        }
    })
})

type OwnProps = { children: React.ReactNode; }

export default function MyIconButtonBase(props: OwnProps) {
    const classes = useStyles();
    return (
        <IconButton>
            <SvgIcon className={classes.icon}>
                {props.children}
            </SvgIcon>
        </IconButton>
    )
}
