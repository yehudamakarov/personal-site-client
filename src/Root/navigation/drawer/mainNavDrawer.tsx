import React from 'react'
import { Drawer, List, Paper, createStyles, Theme, makeStyles, ListItem, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, closeDrawer } from "../../../store/reducers/uiReducer";
import { width } from '@material-ui/system';

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
                    <ListItem button >
                        <ListItemText>Placeholder Nav Item</ListItemText>
                    </ListItem>
                </List>
            </Paper>
        </Drawer>
    )
}
