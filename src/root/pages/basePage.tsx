import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(4),
        },
    })
);

export const BasePage = (props: any) => {
    const { children } = props;

    const classes = useStyles();
    return <Container className={classes.container}>{children}</Container>;
};
