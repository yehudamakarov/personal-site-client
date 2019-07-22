import React from 'react'
import { TextField, Container, Drawer, Button, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu";

export default function TopBar() {
    return (
        <AppBar color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">YM</Typography>
            </Toolbar>
        </AppBar>
    )
}
