import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBlogPostsLoadingAction } from "../../../store/entities/blogPost/actions/getBlogPosts/actions";
import { getProjectsLoadingAction } from "../../../store/entities/projects/data/actions/getProjects/actions";
import { ITag } from "../../../store/entities/tags/actions/api";
import { TransferListForBlogPosts } from "./transferListForBlogPosts";
import { TransferListForProjects } from "./transferListForProjects";

export const TransferListForProjectsAndBlogPosts = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogPostsLoadingAction());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProjectsLoadingAction());
    }, [dispatch]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <TransferListForProjects tagId={props.tagId} />
            </Grid>
            <Grid item xs={12}>
                <TransferListForBlogPosts tagId={props.tagId} />
            </Grid>
        </Grid>
    );
};
