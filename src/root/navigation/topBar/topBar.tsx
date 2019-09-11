import {
    AppBar,
    Button,
    Container,
    createStyles,
    Drawer,
    IconButton,
    Link,
    makeStyles,
    TextField,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useDispatch } from "react-redux";
import { openDrawerAction } from "../../../store/ui/uiActions";
import { MyIconButtonBase } from "../../iconButtons/base/myIconButtonBase";
import { ApiIconButton } from "../../iconButtons/buttons/apiIconButton";
import { GithubIconButton } from "../../iconButtons/buttons/githubIconButton";
import { BrandLogo } from "./brandLogo";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        githubLogo: {
            maxHeight: 26,
            maxWidth: 26,
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
    });
});

export const TopBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleDrawerOpen = () => dispatch(openDrawerAction());
    return (
        <AppBar color="primary" position="sticky">
            <Container>
                <Toolbar disableGutters>
                    <Tooltip title="Navigation" placement="bottom-start">
                        <MyIconButtonBase
                            styleProp={classes.menuButton}
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </MyIconButtonBase>
                    </Tooltip>
                    <BrandLogo />
                    {/* ********** */}
                    {/* RIGHT SIDE */}
                    <Link
                        target="_blank"
                        href={`${process.env.REACT_APP_API_URL}/swagger`}
                    >
                        <Tooltip title="Backend API" placement="bottom">
                            <ApiIconButton />
                        </Tooltip>
                    </Link>
                    <Link
                        target="_blank"
                        href={process.env.REACT_APP_GITHUB_PROJECT_URL}
                    >
                        <Tooltip
                            title="Github Repository"
                            placement="bottom-end"
                        >
                            <GithubIconButton />
                        </Tooltip>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
