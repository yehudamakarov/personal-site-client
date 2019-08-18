import React from 'react'
import { Drawer, List, Paper, createStyles, Theme, makeStyles, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, ListItemIcon, SvgIcon } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PortraitIcon from '@material-ui/icons/Portrait';
import WorkIcon from '@material-ui/icons/Work';
import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, closeDrawer } from "../../../store/reducers/uiReducer";
import { Link } from '@reach/router';
import { ApiIcon } from '../../iconButtons/icons/apiIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
    drawerBackground: {
        [theme.breakpoints.down("xs")]: {
            width: '100vw'
        },
        [theme.breakpoints.up("sm")]: {
            width: 340
        }
    }
}))

export const MainNavDrawer = () => {
    const drawerOpen = useSelector((state: ApplicationState) => state.ui.drawerOpen
    )
    const dispatch = useDispatch();
    const handleDrawerClose = () => dispatch(closeDrawer())
    const classes = useStyles()



    return (
        <Drawer open={drawerOpen} onClose={handleDrawerClose}>
            <Paper onClick={handleDrawerClose} className={classes.drawerBackground}>
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "h6" }}>Home</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="about">
                        <ListItemIcon>
                            <PortraitIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "h6" }}>About</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="projects">
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "h6" }}>Projects</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="blog">
                        <ListItemIcon>
                            <NotesRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "h6" }}>Blog</ListItemText>
                    </ListItem>
                    <ListItem button component="a" href="/api/swagger">
                        <ListItemIcon>
                            <ApiIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "h6" }}>API</ListItemText>
                    </ListItem>
                </List>
            </Paper>
        </Drawer>
    )
}
