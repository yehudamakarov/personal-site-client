import { Grid, List, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { BasePage } from "../basePage";
import { TagsManagementTagListItem } from "./tagsManagementTagListItem";

export const TagsManagementPage = (props: { path: string }) => {
    const tags = useSelector((state: IApplicationState) => state.tags.tagsData);

    return (
        <BasePage>
            <Typography variant={"h4"}>Tags Management</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <List>
                        {tags.map((tag) => (
                            <TagsManagementTagListItem key={tag.tagId} tagId={tag.tagId} />
                        ))}
                    </List>
                </Grid>
            </Grid>
        </BasePage>
    );
};
