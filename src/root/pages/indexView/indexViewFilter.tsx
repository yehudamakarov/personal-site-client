import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";
import { IFilter } from "../../../store/ui/IUiState";

const IndexViewFilter = (props: {
    filter: IFilter;
    setFilter: (newFilter: IFilter) => void;
}) => {
    const {
        filter: { listingType },
        filter,
        setFilter,
    } = props;

    const handleListingTypeChange = (
        listingTypeSwitched: "projects" | "blogPosts"
    ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked === false) {
            const calculatedListingType =
                listingTypeSwitched === "projects"
                    ? ("blogPosts" as "blogPosts")
                    : ("projects" as "projects");
            const newFilter = {
                ...filter,
                listingType: calculatedListingType,
            };
            setFilter(newFilter);
        } else if (checked === true) {
            const newFilter = {
                ...filter,
                listingType: "all" as "all",
            };
            setFilter(newFilter);
        }
    };

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={
                                listingType === "projects" ||
                                listingType === "all"
                            }
                            onChange={handleListingTypeChange("projects")}
                        />
                    }
                    label="Projects"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={
                                listingType === "blogPosts" ||
                                listingType === "all"
                            }
                            onChange={handleListingTypeChange("blogPosts")}
                        />
                    }
                    label="Blog Posts"
                />
            </FormGroup>
        </div>
    );
};

export default IndexViewFilter;
