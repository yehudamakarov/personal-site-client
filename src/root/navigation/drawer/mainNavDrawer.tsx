import {
    Button,
    Collapse,
    createStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Theme,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import PortraitIcon from "@material-ui/icons/Portrait";
import WorkIcon from "@material-ui/icons/Work";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { logoutLoadingAction } from "../../../store/entities/auth/actions/logout/actions";
import { IApplicationState } from "../../../store/rootReducer";
import { closeDrawerAction } from "../../../store/ui/uiActions";
import { useAuth } from "../../hooks/useAuth";
import { ApiIcon } from "../../iconButtons/icons/apiIcon";
import { TagListItem } from "./tagListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions: {
            display: "flex",
            flexDirection: "row-reverse",
            margin: theme.spacing(2),
        },
        drawerBackground: {
            [theme.breakpoints.down("xs")]: {
                width: "100vw",
            },
            [theme.breakpoints.up("sm")]: {
                width: 440,
            },
        },
        exitArrow: {
            ...theme.mixins.toolbar,
        },
        list: {
            paddingTop: 0,
        },
    })
);

export const MainNavDrawer = () => {
    const drawerOpen = useSelector(
        (state: IApplicationState) => state.ui.drawerOpen
    );
    const isLoggedIn = useAuth([roleType.administrator]);
    const tags = useSelector((state: IApplicationState) => state.tags.tagsData);
    const dispatch = useDispatch();
    const handleDrawerClose = () => dispatch(closeDrawerAction());

    const classes = useStyles();

    const [tagsAreOpen, setTagsAreOpen] = useState(false);
    const handleTagsOpen = () => setTagsAreOpen(!tagsAreOpen);

    const handleLogout = () => {
        handleDrawerClose();
        dispatch(logoutLoadingAction());
    };

    return (
        <Drawer open={drawerOpen} onClose={handleDrawerClose}>
            <Paper className={classes.drawerBackground}>
                <List className={classes.list}>
                    <ListItem
                        button
                        divider
                        className={classes.exitArrow}
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <ArrowBackIosIcon />
                        </ListItemIcon>
                    </ListItem>
                    {!isLoggedIn ? (
                        <ListItem
                            button
                            component={Link}
                            to="login"
                            onClick={handleDrawerClose}
                        >
                            <ListItemIcon>
                                <LockOpenIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ variant: "h6" }}
                            >
                                Login
                            </ListItemText>
                        </ListItem>
                    ) : (
                        <ListItem
                            button
                            component={Link}
                            to="dashboard"
                            onClick={handleDrawerClose}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ variant: "h6" }}
                            >
                                Dashboard
                            </ListItemText>
                        </ListItem>
                    )}
                    <ListItem
                        button
                        component={Link}
                        to="/"
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ variant: "h6" }}
                        >
                            Home
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="about"
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <PortraitIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ variant: "h6" }}
                        >
                            About
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="projects"
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Projects"
                            primaryTypographyProps={{ variant: "h6" }}
                        />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="blogPosts"
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <NotesRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ variant: "h6" }}
                            primary="Blog"
                        />
                    </ListItem>
                    <ListItem button onClick={handleTagsOpen}>
                        <ListItemIcon>
                            <LabelTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ variant: "h6" }}
                            primary="Tags"
                        />
                        {tagsAreOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={tagsAreOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {tags.map((tag) => (
                                <TagListItem
                                    onClick={handleDrawerClose}
                                    key={tag.tagId}
                                    name={tag.tagId}
                                />
                            ))}
                        </List>
                    </Collapse>
                    <ListItem
                        button
                        component="a"
                        href="/api/swagger"
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <ApiIcon />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ variant: "h6" }}
                        >
                            API
                        </ListItemText>
                    </ListItem>
                </List>
            </Paper>
            {isLoggedIn && (
                <div className={classes.actions}>
                    <Button
                        onClick={handleLogout}
                        variant={"contained"}
                        color={"secondary"}
                    >
                        Log Out
                    </Button>
                </div>
            )}
        </Drawer>
    );
};
