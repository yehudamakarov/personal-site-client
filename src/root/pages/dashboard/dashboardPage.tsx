import {
    Card,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import LabelTwoToneIcon from "@material-ui/icons/LabelTwoTone";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import { Link } from "@reach/router";
import React from "react";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { DashboardAddBlogPostRoute, DashboardTagsRoute, Routes } from "../../../store/ui/IUiState";

import { BasePage } from "../basePage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(1),
        },
        cardTitle: {
            marginBottom: theme.spacing(1),
        },
        root: {
            margin: theme.spacing(1),
        },
        title: {
            marginBottom: theme.spacing(3),
        },
    })
);

function ManagementListItem(props: {
    to: DashboardTagsRoute | DashboardAddBlogPostRoute;
    title: string;
    icon: React.ReactElement;
}) {
    return (
        <ListItem button component={Link} to={props.to}>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText
                primaryTypographyProps={{
                    variant: "subtitle2",
                }}
            >
                {props.title}
            </ListItemText>
        </ListItem>
    );
}

export const DashboardPage = (props: { path: string }) => {
    const classes = useStyles();
    return (
        <BasePage backTo={Routes.home} title={"Dashboard"} redirectIfNot={[roleType.administrator]}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card square className={classes.card}>
                        <Typography className={classes.cardTitle} variant={"h5"}>
                            Management
                        </Typography>
                        <Divider />
                        <List dense>
                            <ManagementListItem
                                title={"Manage Tags"}
                                to={Routes.dashboardTags}
                                icon={<LabelTwoToneIcon />}
                            />
                            <ManagementListItem
                                title={"Add Blog Post"}
                                to={Routes.dashboardAddBlogPost}
                                icon={<NotesRoundedIcon />}
                            />
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </BasePage>
    );
};
