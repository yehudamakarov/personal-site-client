import { Grid, Theme, Typography, useMediaQuery } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { ITag } from "../../../store/entities/tags/actions/api";
import { BasePage } from "../basePage";
import { TransferListForProjectsAndBlogPosts } from "./transferListForProjectsAndBlogPosts";

export const TagsMapPage = (props: RouteComponentProps<{ tagId: ITag["tagId"] }>) => {
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    return (
        <BasePage>
            <Typography variant={isXs ? "h6" : "h4"}>Map Tag: {`${props.tagId}`}</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <TransferListForProjectsAndBlogPosts tagId={props.tagId} />
                </Grid>
            </Grid>
        </BasePage>
    );
};
