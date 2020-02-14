import { Chip, createStyles, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import { RouteComponentProps } from "@reach/router";
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
        <BasePage backTo={Routes.dashboardTags} title={"Map Tag:"} redirectIfNot={[roleType.administrator]}>
            <div className={classes.tag}>
                {/*<Typography variant={isXs ? "button" : "subtitle2"}>{tagTitle}</Typography>*/}
                <Chip component={"span"} size={isXs ? "small" : "medium"} icon={<LabelIcon />} label={tagTitle} />
            </div>

            <TransferListForProjectsAndBlogPosts tagId={tagTitle} />
            <TagMapSaveDialog tagId={tagTitle} />
        </BasePage>
    );
};
