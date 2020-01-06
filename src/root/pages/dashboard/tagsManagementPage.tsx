import { CircularProgress, createStyles, Grid, List, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { TagsManagementTagListItem } from "./tagsManagementTagListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            marginTop: theme.spacing(3),
            textAlign: "center",
        },
    }),
);
export const TagsManagementPage = (props: { path: string }) => {
    const classes = useStyles();
    const tagIds = useSelector((state: IApplicationState) => state.tags.tagsData.map((tag) => tag.tagId));
    const tagsAreLoading = useSelector((state: IApplicationState) => state.tags.tagsUi.allIsLoading);
    return (
        <BasePage redirectIfNot={[roleType.administrator]}>
            <Typography variant={"h4"}>Tags Management</Typography>
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
        </BasePage>
    );
};
