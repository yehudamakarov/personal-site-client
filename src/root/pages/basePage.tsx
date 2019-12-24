import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down("xs")]: {
                marginTop: theme.spacing(1),
            },
            [theme.breakpoints.up("sm")]: {
                marginTop: theme.spacing(3),
            },
        },
    })
);

export const BasePage = (props: any) => {
    const { children } = props;

    const classes = useStyles();
    return <Container className={classes.container}>{children}</Container>;
};
