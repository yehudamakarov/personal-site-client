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
import { Link } from "@reach/router";
import React from "react";
import { Routes } from "../../../store/ui/IUiState";
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

export const DashboardPage = (props: { path: string }) => {
    const classes = useStyles();

    return (
        <BasePage>
            <Typography className={classes.title} variant={"h4"}>
                Dashboard
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card square className={classes.card}>
                        <Typography className={classes.cardTitle} variant={"h5"}>
                            Management
                        </Typography>
                        <Divider />
                        <List dense>
                            <ListItem button component={Link} to={Routes.dashboardTags}>
                                <ListItemIcon>
                                    <LabelTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{
                                        variant: "subtitle2",
                                    }}
                                >
                                    Manage Tags
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </BasePage>
    );
};
