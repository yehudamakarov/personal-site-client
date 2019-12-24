import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ITag } from "../../../store/entities/tags/actions/api";
import { getTransferListFacadesLoadingAction } from "../../../store/entities/tagsTransferList/actions/getTransferListFacades";
import { TransferListForProjects } from "./transferListForProjects";

export const TransferListForProjectsAndBlogPosts = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransferListFacadesLoadingAction(props.tagId));
    }, [dispatch, props.tagId]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TransferListForProjects />
            </Grid>
        </Grid>
    );
};
