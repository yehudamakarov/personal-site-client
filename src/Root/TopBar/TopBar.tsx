import React from 'react'
import { TextField, Container, Drawer, Button, AppBar, Toolbar, IconButton, Typography, makeStyles, createStyles, Theme } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";
import CodeIcon from "@material-ui/icons/Code"

const useStyles = makeStyles((theme: Theme) => 
     createStyles(
        {
            iconPush: {
                flexGrow: 1
            }
        }
    )
)

export default function TopBar() {
    const classes = useStyles();
    return (
        <AppBar color="primary">
            <Container>
                <Toolbar>
                    <IconButton edge="start" color="inherit" >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.iconPush}>YM</Typography>
                    <IconButton color="inherit">
                        <CodeIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
