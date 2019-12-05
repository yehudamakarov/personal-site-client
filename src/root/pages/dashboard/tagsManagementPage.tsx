import { createStyles, Grid, List, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { TagsManagementTagListItem } from "./tagsManagementTagListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            marginTop: theme.spacing(1),
        },
        root: {
            margin: theme.spacing(1),
        },
    }),
);

export const TagsManagementPage = (props: { path: string }) => {
    const classes = useStyles();
    const tags = useSelector((state: IApplicationState) => state.tags.tagsData);

    return (
        <BasePage>
            <Typography variant={"h4"}>Tags Management</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <List>
                        {tags.map((tag) => (
                            <TagsManagementTagListItem
                                key={tag.tagId}
                                tagId={tag.tagId}
                            />
                        ))}
                    </List>
                </Grid>
            </Grid>
        </BasePage>
    );
};
