import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { ITag } from "../../../store/entities/tags/actions/api";
import { BasePage } from "../basePage";
import { TransferListForProjectsAndBlogPosts } from "./transferListForProjectsAndBlogPosts";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    })
);

export const TagsMapPage = (props: RouteComponentProps<{ tagId: ITag["tagId"] }>) => {
    const classes = useStyles();

    return (
        <BasePage>
            <Typography variant={"h4"}>Map Tag: {`${props.tagId}`}</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <TransferListForProjectsAndBlogPosts tagId={props.tagId} />
                </Grid>
            </Grid>
        </BasePage>
    );
};
