import { Container, Link, Theme, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as RouterLink } from "@reach/router";
import React from "react";
import { useDispatch } from "react-redux";
import { roleType } from "../../../store/actions/auth/authReducer";
import { loginLoadingAction } from "../../../store/actions/auth/login/actions";
import { logoutLoadingAction } from "../../../store/actions/auth/logout/actions";
import { Routes } from "../../../store/ui/IUiState";
import { useAuth } from "../../hooks/useAuth";
import { BasePage } from "../basePage";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https:/yehudamakarov.com/">
                YM's Site
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        margin: theme.spacing(1),
    },
    container: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing(8),
    },
    form: {
        marginTop: theme.spacing(1),
        width: "100%", // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const LoginPage = (props: { path: string }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isLoggedIn = useAuth([roleType.administrator]);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        switch (event.target.id) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(loginLoadingAction({ firstName, lastName, password }));
    };

    const handleLogOut = () => {
        dispatch(logoutLoadingAction());
    };

    return (
        <BasePage>
            {isLoggedIn ? (
                <Container className={classes.container} maxWidth={"xs"}>
                    <Typography variant={"subtitle2"}>
                        {" "}
                        You are already logged in.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        component={RouterLink}
                        to={Routes.home}
                    >
                        Browse around
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleLogOut}
                    >
                        Log out
                    </Button>
                </Container>
            ) : (
                <Container className={classes.container} maxWidth={"xs"}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            value={firstName}
                            onChange={handleFormChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            value={lastName}
                            onChange={handleFormChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleFormChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            )}
        </BasePage>
    );
};
