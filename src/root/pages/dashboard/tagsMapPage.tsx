import { Theme, Typography, useMediaQuery } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { TagTitleHelpers } from "../../../helpers/tagTitleHelpers";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { ITag } from "../../../store/entities/tags/actions/api";
import { BasePage } from "../basePage";
import { TagMapSaveDialog } from "./tagMapSaveDialog";
import { TransferListForProjectsAndBlogPosts } from "./transferListForProjectsAndBlogPosts";

export const TagsMapPage = (props: RouteComponentProps<{ tagId: ITag["tagId"] }>) => {
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    const tagTitle = TagTitleHelpers.getTagTitle(props);
    return (
        <BasePage redirectIfNot={[roleType.administrator]}>
            <Typography variant={isXs ? "h6" : "h4"}>Map Tag: {tagTitle}</Typography>
            <TransferListForProjectsAndBlogPosts tagId={tagTitle} />
            <TagMapSaveDialog tagId={tagTitle} />
        </BasePage>
    );
};
