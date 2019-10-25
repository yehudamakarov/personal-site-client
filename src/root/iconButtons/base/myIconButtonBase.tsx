import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        iconButton: {
            "& svg": {
                fill: theme.palette.common.white,
                transition: "fill 300ms ease-out",
            },
            "&:hover": {
                "& svg": {
                    fill: theme.palette.common.black,
                    transition: "fill 300ms ease-in",
                },
                backgroundColor: theme.palette.common.white,
                transition: "background-color 100ms ease-in",
            },
            transition: "background-color 500ms ease-out",
        },
    });
});

interface IOwnProps {
    children: React.ReactNode;
    edge?: false | "end" | "start";
    onClick?: () => void;
    styleProp?: string;
    disabled?: boolean;
}

export const MyIconButtonBase = React.forwardRef(
    (props: IOwnProps, ref: React.Ref<HTMLButtonElement>) => {
        const { children, edge, styleProp, ...rest } = props;
        const classes = useStyles();
        return (
            <IconButton
                {...rest}
                ref={ref}
                className={classes.iconButton + " " + styleProp}
                edge={edge ? edge : false}
            >
                {children}
            </IconButton>
        );
    },
);
