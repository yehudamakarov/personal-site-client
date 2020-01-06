import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Redirect } from "@reach/router";
import React from "react";
import { roleType } from "../../store/entities/auth/actions/authReducer";
import { Routes } from "../../store/ui/IUiState";
import { useAuth } from "../hooks/useAuth";

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

export const BasePage = (props: { children: any; redirectIfNot?: roleType[]; isLoginPage?: boolean }) => {
    const { children } = props;
    const classes = useStyles();
    const isAuthorized = useAuth(props.redirectIfNot);
    if (!props.redirectIfNot) {
        return <Container className={classes.container}>{children}</Container>;
    }
    if (!isAuthorized && !props.isLoginPage) {
        return <Redirect noThrow to={Routes.login} />;
    } else {
        return <Container className={classes.container}>{children}</Container>;
    }
};
