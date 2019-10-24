/* eslint-disable react/jsx-no-duplicate-props */
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

export const TextSearch = (props: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <TextField
        onChange={props.onChange}
        fullWidth
        inputProps={{ style: { height: "auto" } }}
        label="Search"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon/>
                </InputAdornment>
            ),
        }}
    />
);
