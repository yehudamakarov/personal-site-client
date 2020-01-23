import { Button, createStyles, Grid, makeStyles, Theme, Typography, useMediaQuery } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, RouteComponentProps } from "@reach/router";
import React from "react";
import { TagTitleHelpers } from "../../../helpers/tagTitleHelpers";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { Tag } from "../../../store/entities/tags/actions/api";
import { Routes } from "../../../store/ui/IUiState";
import { BasePage } from "../basePage";
import { TagMapSaveDialog } from "./tagMapSaveDialog";
import { TransferListForProjectsAndBlogPosts } from "./transferListForProjectsAndBlogPosts";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backButton: {
            paddingTop: theme.spacing(1),
        },
        tag: {
            paddingLeft: theme.spacing(0.5),
        },
    })
);

export const TagsMapPage = (props: RouteComponentProps<{ tagId: Tag["tagId"] }>) => {
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    const tagTitle = TagTitleHelpers.getTagTitle(props);
    const classes = useStyles();
    return (
        <BasePage redirectIfNot={[roleType.administrator]}>
            <Grid container spacing={1} justify={"space-between"}>
                <Grid item>
                    <Typography gutterBottom={false} variant={isXs ? "h6" : "h4"}>
                        Map Tag:
                    </Typography>
                </Grid>
                <Grid item>
                    <Button component={Link} to={Routes.dashboardTags} startIcon={<ArrowBackIcon />}>
                        back
                    </Button>
                </Grid>
            </Grid>

            <div className={classes.tag}>
                <Typography variant={isXs ? "button" : "subtitle2"}>{tagTitle}</Typography>
            </div>

            <TransferListForProjectsAndBlogPosts tagId={tagTitle} />
            <TagMapSaveDialog tagId={tagTitle} />
        </BasePage>
    );
};
