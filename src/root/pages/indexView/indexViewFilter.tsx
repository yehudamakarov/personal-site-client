import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Switch,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { IFilter, IFilterListingTypes } from "../../../store/ui/IUiState";
import { setFilterAction } from "../../../store/ui/uiActions";

const IndexViewFilter = React.memo((props: { filter: IFilter }) => {
    const {
        filter: { listingTypes },
        filter,
    } = props;
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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
        const keys: string[] = Object.keys(listingTypes);
        return keys.reduce(
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

    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="show-multiple-select">Showing:</InputLabel>
                <Select
                    multiple
                    value={listingTypeValues}
                    onChange={handleChange}
                    renderValue={getSelectedAsDisplayString}
                    input={<Input id="show-multiple-select" />}
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
        </div>
    );
});

export default IndexViewFilter;
