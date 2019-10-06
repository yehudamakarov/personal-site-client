import {
    Checkbox,
    createStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Switch,
    TextField,
    Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { debounce } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { IFilter, IFilterListingTypes } from "../../../store/ui/IUiState";
import { setFilterAction } from "../../../store/ui/uiActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        multiSelect: {
            minWidth: theme.spacing(16),
        },
        root: {
            margin: theme.spacing(1),
        },
        search: {
            height: "auto",
        },
    })
);

const IndexViewFilter = React.memo((props: { filter: IFilter }) => {
    const {
        filter: { listingTypes },
        filter,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleListingTypesChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        const selectedValues = event.target.value as string[];
        const newListingTypes: IFilterListingTypes = { ...listingTypes };
        for (const listingType in listingTypes) {
            if (listingTypes.hasOwnProperty(listingType)) {
                if (selectedValues.includes(listingType)) {
                    newListingTypes[listingType] = true;
                } else {
                    newListingTypes[listingType] = false;
                }
            }
        }
        const newFilter: IFilter = {
            listingTypes: newListingTypes,
            searchText: filter.searchText,
            tagIds: filter.tagIds,
        };

        dispatch(setFilterAction(newFilter));
    };

    const getArrayOfListingTypesSelected = () => {
        const listingTypeKeys: string[] = Object.keys(listingTypes);
        return listingTypeKeys.reduce(
            (agg, el) => {
                if (listingTypes[el]) {
                    agg.push(el);
                }
                return agg;
            },
            [] as string[]
        );
    };

    const listingTypeValues = getArrayOfListingTypesSelected();

    const getSelectedAsDisplayString = (selected: any) => {
        return (selected as ["projects", "blogPosts", "tags"])
            .map((listingType) => {
                switch (listingType) {
                    case "projects":
                        return "Projects";
                    case "blogPosts":
                        return "Blog Posts";
                    case "tags":
                        return "Tags";
                    default:
                        break;
                }
            })
            .join(", ");
    };

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

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={4}>
                    <FormControl fullWidth className={classes.multiSelect}>
                        <InputLabel htmlFor="show-multiple-select">
                            Showing:
                        </InputLabel>
                        <Select
                            multiple
                            value={listingTypeValues}
                            onChange={handleListingTypesChange}
                            renderValue={getSelectedAsDisplayString}
                            input={
                                <Input fullWidth id="show-multiple-select" />
                            }
                        >
                            <MenuItem value="projects">
                                <Checkbox checked={listingTypes.projects} />
                                <ListItemText primary="Projects" />
                            </MenuItem>
                            <MenuItem value="blogPosts">
                                <Checkbox checked={listingTypes.blogPosts} />
                                <ListItemText primary="Blog Posts" />
                            </MenuItem>
                            <MenuItem value="tags">
                                <Checkbox checked={listingTypes.tags} />
                                <ListItemText primary="Tags" />
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm>
                    <TextField
                        onChange={searchChange}
                        fullWidth
                        inputProps={{ style: { height: "auto" } }}
                        label="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} />
            </Grid>
        </div>
    );
});

export default IndexViewFilter;
