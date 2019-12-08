import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBlogPostsLoadingAction } from "../../../store/entities/blogPost/actions/getBlogPosts/actions";
import { getProjectsLoadingAction } from "../../../store/entities/projects/data/actions/getProjects/actions";
import { ITag } from "../../../store/entities/tags/actions/api";
import { TransferListForProjectsAndBlogPosts } from "./transferListForProjectsAndBlogPosts";

export const TransferListForProjectsAndBlogPostsContainer = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogPostsLoadingAction());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getProjectsLoadingAction());
    }, [dispatch]);

    return <TransferListForProjectsAndBlogPosts tagId={props.tagId} />;
};
