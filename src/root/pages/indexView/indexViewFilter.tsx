import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Switch,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { IFilter } from "../../../store/ui/IUiState";
import { setFilterAction } from "../../../store/ui/uiActions";

const IndexViewFilter = React.memo((props: { filter: IFilter }) => {
    const {
        filter: { listingTypes },
        filter,
    } = props;
    const dispatch = useDispatch();

    const handleListingTypeChange = (
        listingTypeSwitched: "projects" | "blogPosts" | "tags"
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const newFilter: IFilter = {
            listingTypes: { ...listingTypes, [listingTypeSwitched]: checked },
            searchText: filter.searchText,
            tagIds: filter.tagIds,
        };

        dispatch(setFilterAction(newFilter));
    };

    return (
        <div>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={listingTypes.projects}
                            onChange={handleListingTypeChange("projects")}
                        />
                    }
                    label="Projects"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={listingTypes.blogPosts}
                            onChange={handleListingTypeChange("blogPosts")}
                        />
                    }
                    label="Blog Posts"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={listingTypes.tags}
                            onChange={handleListingTypeChange("tags")}
                        />
                    }
                    label="Tags"
                />
            </FormGroup>
        </div>
    );
});

export default IndexViewFilter;
