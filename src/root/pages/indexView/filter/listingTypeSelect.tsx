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
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../../store/rootReducer";
import { IFilter, IFilterListingTypes } from "../../../../store/ui/IUiState";
import { setFilterAction } from "../../../../store/ui/uiActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        multiSelect: {
            minWidth: theme.spacing(16),
        },
    })
);

export const ListingTypeSelect = (props: {
    path: "projects" | "blogPosts" | "tags";
}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const listingTypes = useSelector(
        (state: IApplicationState) => state.ui.filter.listingTypes,
        _.isEqual,
    );

    // todo not efficient, shouldn't need once we are only dispatching the new tags instead of the whole filter.
    const filter = useSelector((state: IApplicationState) => state.ui.filter);

    // todo clean this up into a single action so we do not need to assemble the entire filter and dispatch it
    useEffect(() => {
        const cleanedFilterListTypes: any = {};
        Object.keys(filterListingTypes).forEach(clearOtherListingTypes);

        function clearOtherListingTypes(listingTypeKey: string) {
            if (listingTypeKey !== props.path) {
                cleanedFilterListTypes[listingTypeKey] = false;
            }
        }

        const initialFilterFromRoute: IFilter = {
            listingTypes: { ...cleanedFilterListTypes, [props.path]: true },
            searchText: filterSearchText,
            tagIds: filterTagIds,
        };
        // todo make this it's own action to set the filterTypesFromRoute. send only the path and generate an object that's empty
        dispatch(setFilterAction(initialFilterFromRoute));
    }, [props.path]);

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
