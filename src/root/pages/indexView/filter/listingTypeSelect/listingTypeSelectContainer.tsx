import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../../../store/rootReducer";
import { setListingTypesForFilterAction } from "../../../../../store/ui/uiActions";
import {
    getArrayOfListingTypesSelected,
    getFilterListTypesFromPath,
    getNewListingTypes,
    getSelectedAsDisplayString,
} from "./listingTypeSelectHelpers";
import { ListingTypeSelectPresentational } from "./listingTypeSelectPresentational";

export const ListingTypeSelectContainer = (props: {
    path: "projects" | "blogPosts" | "tags";
}) => {
    const dispatch = useDispatch();
    const filterListingTypes = useSelector((state: IApplicationState) => {
        return state.ui.filter.listingTypes;
    }, shallowEqual);

    useEffect(() => {
        const listingTypesBasedOnPath = getFilterListTypesFromPath(
            props.path,
            filterListingTypes,
        );

        dispatch(setListingTypesForFilterAction(listingTypesBasedOnPath));
    }, [props.path]);

    const handleListingTypesChange = (
        event: React.ChangeEvent<{ value: unknown }>,
    ) => {
        const newListingTypes = getNewListingTypes(
            event.target.value as string[],
            filterListingTypes,
        );
        dispatch(setListingTypesForFilterAction(newListingTypes));
    };

    return (
        <ListingTypeSelectPresentational
            listingTypeValues={getArrayOfListingTypesSelected(
                filterListingTypes,
            )}
            handleListingTypesChange={handleListingTypesChange}
            getSelectedAsDisplayString={getSelectedAsDisplayString}
            filterListingTypes={filterListingTypes}
            path={props.path}
        />
    );
};
