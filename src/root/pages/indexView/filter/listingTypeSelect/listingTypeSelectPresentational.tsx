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
import { IFilterListingTypes, IndexTypeRoute } from "../../../../../store/ui/IUiState";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        multiSelect: {
            minWidth: theme.spacing(16),
        },
    })
);

interface IOwnProps {
    path: IndexTypeRoute;
    listingTypeValues: string[];
    handleListingTypesChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    getSelectedAsDisplayString: (selected: any) => string;
    filterListingTypes: IFilterListingTypes;
}

export const ListingTypeSelectPresentational = (props: IOwnProps) => {
    const classes = useStyles();
    const renderEmpty = () => true;
    return (
        <FormControl fullWidth className={classes.multiSelect}>
            <InputLabel shrink htmlFor="show-multiple-select">
                Showing:
            </InputLabel>
            <Select
                multiple
                value={props.listingTypeValues}
                onChange={props.handleListingTypesChange}
                renderValue={props.getSelectedAsDisplayString}
                input={<Input fullWidth id="show-multiple-select" />}
                displayEmpty
            >
                <MenuItem value="projects">
                    <Checkbox color={"primary"} checked={props.filterListingTypes.projects} />
                    <ListItemText primary="Projects" />
                </MenuItem>
                <MenuItem value="blogPosts">
                    <Checkbox color={"primary"} checked={props.filterListingTypes.blogPosts} />
                    <ListItemText primary="Blog Posts" />
                </MenuItem>
            </Select>
        </FormControl>
    );
};
