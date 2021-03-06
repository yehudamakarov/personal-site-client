import { CircularProgress, createStyles, Grid, List, makeStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { getTagsLoadingAction } from "../../../store/entities/tags/actions/getTags/actions";
import { IApplicationState } from "../../../store/rootReducer";
import { Routes } from "../../../store/ui/IUiState";
import { BasePage } from "../basePage";
import { TagDeleteDialog } from "./tagDeleteDialog";
import { TagRenameDialog } from "./tagRenameDialog";
import { TagsManagementTagListItem } from "./tagsManagementTagListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            marginTop: theme.spacing(3),
            textAlign: "center",
        },
    })
);
export const TagsManagementPage = (props: RouteComponentProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tagIds = useSelector((state: IApplicationState) => state.tags.tagsData.map((tag) => tag.tagId));
    const tagsAreLoading = useSelector((state: IApplicationState) => state.tags.tagsUi.allIsLoading);
    useEffect(() => {
        dispatch(getTagsLoadingAction());
    }, [dispatch]);
    return (
        <BasePage backTo={Routes.dashboard} title={"Tag Management"} redirectIfNot={[roleType.administrator]}>
            {tagsAreLoading ? (
                <div className={classes.progress}>
                    <CircularProgress variant={"indeterminate"} />
                </div>
            ) : (
                <Grid container>
                    <Grid item xs={12}>
                        <List>
                            {tagIds.map((tagId) => (
                                <TagsManagementTagListItem key={tagId} tagId={tagId} />
                            ))}
                        </List>
                    </Grid>
                </Grid>
            )}
            {/* todo looking at this, how can i see right away how this opend? */}
            <TagRenameDialog />
            <TagDeleteDialog />
        </BasePage>
    );
};
