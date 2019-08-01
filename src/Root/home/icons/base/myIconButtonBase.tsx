import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        iconButton: {
            transition: "background-color 500ms ease-out",
            '& svg': {
                fill: theme.palette.common.white,
                transition: "fill 300ms ease-out"
            },
            '&:hover': {
                '& svg': {
                    fill: theme.palette.common.black,
                    transition: "fill 300ms ease-in"
                },
                backgroundColor: theme.palette.common.white,
                transition: "background-color 100ms ease-in",
            },
        }
    })
})

type OwnProps = {
    children: React.ReactNode;
    edge?: false | "end" | "start";
    onClick?: () => void;
    styleProp?: string;
    disabled?: boolean;
}

export const MyIconButtonBase = React.forwardRef((props: OwnProps, ref: React.Ref<HTMLButtonElement>) => {
    const { children, edge, styleProp, ...rest } = props;
    const classes = useStyles();
    return (
        <IconButton {...rest} ref={ref} className={classes.iconButton + " " + styleProp} edge={edge ? edge : false} >
            {children}
        </IconButton>
    )
})
