import React from 'react'
import { Tooltip, TextField, Container, Drawer, Button, AppBar, Toolbar, IconButton, Typography, makeStyles, createStyles, Theme, Link } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import CodeIcon from "@material-ui/icons/Code"
import BrandLogo from "./brandLogo"
import githubLogo from "../../../assets/png/GitHub-Mark-Light-120px-plus.png"
import { useDispatch } from 'react-redux';
import { openDrawer } from "../../../store/reducers/uiReducer"


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        menuButton: {
            marginRight: theme.spacing(1)
        },
        githubLogo: {
            maxWidth: 26,
            maxHeight: 26
        }
    })
})


export default function TopBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleDrawerOpen = () => dispatch(openDrawer())
    return (
        <AppBar color="primary">
            <Container >
                <Toolbar disableGutters >
                    <Tooltip title="Navigation" placement="bottom-start" >
                        <IconButton onClick={handleDrawerOpen} className={classes.menuButton} edge="start" color="inherit" >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <BrandLogo />
                    <Link target="_blank" href={process.env.REACT_APP_GITHUB_PROJECT_URL}>
                        <Tooltip title="Github Repo" placement="bottom-end">
                            <IconButton edge="end" color="inherit">
                                <img className={classes.githubLogo} src={githubLogo} />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar >
    )
}
