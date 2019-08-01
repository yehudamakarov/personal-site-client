import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        iconButton: {
            transition: "background-color 300ms cubic-bezier(0, 0.91, 0.46, 0.77)",
            '& svg': {
                fill: theme.palette.common.white,
                transition: "fill 500ms cubic-bezier(0, 0.91, 0.46, 0.77)"
            },
            '&:hover': {
                '& svg': {
                    fill: theme.palette.common.black,
                },
                backgroundColor: theme.palette.common.white
            },
        }
    })
})

type OwnProps = {
    children: React.ReactNode;
    viewBox?: string;
    edge?: false | "end" | "start";
}

export const MyIconButtonBase = React.forwardRef((props: OwnProps, ref: any) => {
    const classes = useStyles();
    const { viewBox, children, edge, ...rest } = props;
    return (
        <IconButton {...rest} ref={ref} className={classes.iconButton} edge={edge ? edge : false} >
            <SvgIcon viewBox={viewBox ? viewBox : '0 0 24 24'} >
                {children}
            </SvgIcon>
        </IconButton>
    )
})
