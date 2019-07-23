import React from 'react'
import { Tooltip, TextField, Container, Drawer, Button, AppBar, Toolbar, IconButton, Typography, makeStyles, createStyles, Theme, Link } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import CodeIcon from "@material-ui/icons/Code"
import BrandLogo from "./BrandLogo"
import githubLogo from "../../../src/assets/PNG/GitHub-Mark-Light-120px-plus.png"

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
    return (
        <AppBar color="primary">
            <Container>
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" >
                        <MenuIcon />
                    </IconButton>
                    <BrandLogo />
                    <Tooltip title="Github Repo" placement="bottom-end">
                        <Link target="_blank" href={process.env.REACT_APP_GITHUB_PROJECT_URL}>
                            <IconButton edge="end" color="inherit">
                                <img className={classes.githubLogo} src={githubLogo} />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Toolbar>
            </Container>
        </AppBar >
    )
}
