import React from 'react'
import { Tooltip, TextField, Container, Drawer, Button, AppBar, Toolbar, IconButton, Typography, makeStyles, createStyles, Theme, Link } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import CodeIcon from "@material-ui/icons/Code"
import { BrandLogo } from "./brandLogo"
import { GithubIconButton } from "../../home/icons/githubIconButton"
import { useDispatch } from 'react-redux';
import { openDrawer } from "../../../store/reducers/uiReducer"
import { MyIconButtonBase } from '../../home/icons/base/myIconButtonBase';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        menuButton: {
            marginRight: theme.spacing(1)
        },
        githubLogo: {
            maxWidth: 26,
            maxHeight: 26
        },
    })
})


export const TopBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleDrawerOpen = () => dispatch(openDrawer())
    return (
        <AppBar color="primary" position="sticky" >
            <Container >
                <Toolbar disableGutters >
                    <Tooltip title="Navigation" placement="bottom-start" >
                        <MyIconButtonBase styleProp={classes.menuButton} onClick={handleDrawerOpen} edge="start" >
                            <MenuIcon />
                        </MyIconButtonBase>
                    </Tooltip>
                    <BrandLogo />
                    <Link target="_blank" href={process.env.REACT_APP_GITHUB_PROJECT_URL}>
                        <Tooltip title="Github Repository" placement="bottom-end" >
                            <GithubIconButton />
                        </Tooltip>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar >
    )
}
