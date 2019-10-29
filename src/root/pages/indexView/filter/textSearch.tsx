/* eslint-disable react/jsx-no-duplicate-props */
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { debounce } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../../store/rootReducer";
import { IFilter } from "../../../../store/ui/IUiState";
import { setFilterAction } from "../../../../store/ui/uiActions";

export const TextSearch = () => {
    const dispatch = useDispatch();

    // todo not efficient, shouldn't need once we are only dispatching the new tags instead of the whole filter.
    const filter = useSelector((state: IApplicationState) => state.ui.filter);

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
    );
};
