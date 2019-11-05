import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { IndexTypeRoute } from "../../../store/ui/IUiState";
import { ListingTypeSelectContainer } from "./filter/listingTypeSelect/listingTypeSelectContainer";
import { TagSearchContainer } from "./filter/tagSearch/tagSearchContainer";
import { TextSearch } from "./filter/textSearch";

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

interface IOwnProps extends RouteComponentProps<{ tagId?: string }> {
    path: IndexTypeRoute;
}

const IndexViewFilter = (props: IOwnProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3} md={4}>
                    <ListingTypeSelectContainer path={props.path} />
                </Grid>
                <Grid item xs={12} sm>
                    <TextSearch />
                </Grid>
                <Grid item xs={12}>
                    <TagSearchContainer {...props} />
                </Grid>
            </Grid>
        </div>
    );
};

export default IndexViewFilter;
