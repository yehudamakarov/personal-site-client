import React from "react";
import { ITag } from "../../../store/entities/tags/actions/api";
import { TransferListBase } from "./transferListBase";

export const TransferListForProjects = (props: { tagId?: ITag["tagId"] }) => {
    return <TransferListBase />;
};
