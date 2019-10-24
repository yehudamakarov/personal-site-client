import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { debounce } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { IFilter } from "../../../store/ui/IUiState";
import { setFilterAction } from "../../../store/ui/uiActions";
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
const IndexViewFilter = React.memo((props: { filter: IFilter }) => {
    const {
        filter: { listingTypes },
        filter,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    const setSearch = debounce((input: string) => {
        const newFilter: IFilter = {
            ...filter,
            searchText: input,
        };

        dispatch(setFilterAction(newFilter));
    }, 500);

    const searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSearch(input);
    };
    const tagsChange = (values: string[]) => {
        const newFilter: IFilter = {
            listingTypes: { ...listingTypes },
            searchText: filter.searchText,
            tagIds: [...values],
        };

        dispatch(setFilterAction(newFilter));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={4}>
                    <ListingTypeSelect {...props} />
                </Grid>
                <Grid item xs={12} sm>
                    <TextSearch onChange={searchChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TagSearch setTags={tagsChange}/>
                </Grid>
            </Grid>
        </div>
    );
});

export default IndexViewFilter;
