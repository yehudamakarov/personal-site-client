import {
    Checkbox,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Theme,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { IFilter, IFilterListingTypes } from "../../../../store/ui/IUiState";
import { setFilterAction } from "../../../../store/ui/uiActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        multiSelect: {
            minWidth: theme.spacing(16),
        },
    })
);

export const ListingTypeSelect = (props: { filter: IFilter }) => {
    const {
        filter: { listingTypes },
        filter,
    } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    // todo move to FilterHelpers
    const getSelectedAsDisplayString = (selected: any) => {
        const beautifyListingType = (
            listingType: "projects" | "blogPosts" | "tags"
        ) => {
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
        };

        return (selected as ["projects", "blogPosts", "tags"])
            .map(beautifyListingType)
            .join(", ");
    };
    // todo move to FilterHelpers
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

    const handleListingTypesChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        const selectedValues = event.target.value as string[];
        const newListingTypes: IFilterListingTypes = { ...listingTypes };
        for (const listingType in listingTypes) {
            if (listingTypes.hasOwnProperty(listingType)) {
                newListingTypes[listingType] = selectedValues.includes(
                    listingType
                );
            }
        }
        const newFilter: IFilter = {
            listingTypes: newListingTypes,
            searchText: filter.searchText,
            tagIds: filter.tagIds,
        };

        // todo make different actions for every way to change the filter
        dispatch(setFilterAction(newFilter));
    };
    return (
        <FormControl fullWidth className={classes.multiSelect}>
            <InputLabel htmlFor="show-multiple-select">Showing:</InputLabel>
            <Select
                multiple
                value={listingTypeValues}
                onChange={handleListingTypesChange}
                renderValue={getSelectedAsDisplayString}
                input={<Input fullWidth id="show-multiple-select" />}
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
    );
};
