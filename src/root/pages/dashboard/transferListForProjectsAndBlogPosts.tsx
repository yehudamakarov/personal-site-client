import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTagIdBeingMappedAction } from "../../../logic/dashboard/tags/map/actions";

import { Tag } from "../../../store/entities/tags/actions/api";
import { getTransferListFacadesLoadingAction } from "../../../store/entities/tagsTransferList/actions/tagsTransferListActions";
import { TransferListBase } from "./transferListBase";

export const TransferListForProjectsAndBlogPosts = (props: { tagId?: Tag["tagId"] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.tagId) {
            dispatch(setCurrentTagIdBeingMappedAction(props.tagId));
            dispatch(getTransferListFacadesLoadingAction(props.tagId));
        }
    }, [dispatch, props.tagId]);

    return <TransferListBase tagId={props.tagId} />;
};
