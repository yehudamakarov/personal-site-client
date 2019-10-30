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
import { IFilterListingTypes } from "../../../../../store/ui/IUiState";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        multiSelect: {
            minWidth: theme.spacing(16),
        },
    })
);

interface IOwnProps {
    path: "projects" | "blogPosts" | "tags";
    listingTypeValues: string[];
    handleListingTypesChange: (
        event: React.ChangeEvent<{ value: unknown }>,
    ) => void;
    getSelectedAsDisplayString: (selected: any) => string;
    filterListingTypes: IFilterListingTypes;
}

export const ListingTypeSelectPresentational = (props: IOwnProps) => {
    const classes = useStyles();
    return (
        <FormControl fullWidth className={classes.multiSelect}>
            <InputLabel htmlFor="show-multiple-select">Showing:</InputLabel>
            <Select
                multiple
                value={props.listingTypeValues}
                onChange={props.handleListingTypesChange}
                renderValue={props.getSelectedAsDisplayString}
                input={<Input fullWidth id="show-multiple-select" />}
            >
                <MenuItem value="projects">
                    <Checkbox checked={props.filterListingTypes.projects} />
                    <ListItemText primary="Projects" />
                </MenuItem>
                <MenuItem value="blogPosts">
                    <Checkbox checked={props.filterListingTypes.blogPosts} />
                    <ListItemText primary="Blog Posts" />
                </MenuItem>
                <MenuItem value="tags">
                    <Checkbox checked={props.filterListingTypes.tags} />
                    <ListItemText primary="Tags" />
                </MenuItem>
            </Select>
        </FormControl>
    );
};
