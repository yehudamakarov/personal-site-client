import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ITag } from "../../../store/entities/tags/actions/api";
import { getTransferListFacadesLoadingAction } from "../../../store/entities/tagsTransferList/actions/getTransferListFacades";
import { TransferListBase } from "./transferListBase";

export const TransferListForProjectsAndBlogPosts = (props: { tagId?: ITag["tagId"] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransferListFacadesLoadingAction(props.tagId));
    }, [dispatch, props.tagId]);

    return <TransferListBase tagId={props.tagId} />;
};
