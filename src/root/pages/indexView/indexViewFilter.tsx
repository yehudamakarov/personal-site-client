import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ListingTypeSelect } from "./filter/listingTypeSelect";
import { TextSearch } from "./filter/textSearch";
import { TagSearch } from "./tagSearch";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
        search: {
            height: "auto",
        },
    })
);

// todo instead of passing the filter as a prop, break out sub components, that get their part of the filter state and update the store when that part of the filter is changed.
const IndexViewFilter = (props: {
    path: "projects" | "blogPosts" | "tags";
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={4}>
                    <ListingTypeSelect {...props} />
                </Grid>
                <Grid item xs={12} sm>
                    <TextSearch/>
                </Grid>
                <Grid item xs={12}>
                    <TagSearch/>
                </Grid>
            </Grid>
        </div>
    );
};

export default IndexViewFilter;
