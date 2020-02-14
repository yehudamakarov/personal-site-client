import { Button, Container, createStyles, Grid, makeStyles, Theme, Typography, useMediaQuery } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, Redirect } from "@reach/router";
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
                marginTop: theme.spacing(2),
            },
        },
        titleBottom: {
            marginBottom: theme.spacing(2),
        },
    })
);

export const BasePage = (props: {
    title: string;
    backTo: string;
    children?: any;
    redirectIfNot?: roleType[];
    isLoginPage?: boolean;
}) => {
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    const { children } = props;
    const classes = useStyles();
    const isAuthorized = useAuth(props.redirectIfNot);
    if (props.redirectIfNot && !isAuthorized) {
        return <Redirect noThrow to={Routes.login} />;
    } else {
        return (
            <Container className={classes.container}>
                <div>
                    <div className={classes.titleBottom}>
                        <Grid container spacing={1} justify={"space-between"} alignItems={"flex-end"}>
                            <Grid item>
                                <Typography gutterBottom={false} variant={isXs ? "h6" : "h5"}>
                                    {props.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button component={Link} to={props.backTo} startIcon={<ArrowBackIcon />}>
                                    back
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div>{children}</div>
                </div>
            </Container>
        );
    }
};
