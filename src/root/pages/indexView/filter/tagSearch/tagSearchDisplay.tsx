/* eslint-disable react-hooks/exhaustive-deps */
import { createStyles, emphasize, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import React, { CSSProperties } from "react";
import Select from "react-select";
import { ValueType } from "react-select/src/types";
import {
    Control,
    IOptionType,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
} from "./tagSearchDisplayHelpers";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        chipFocused: {
            backgroundColor: emphasize(
                theme.palette.type === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[700],
                0.08
            ),
        },
        divider: {
            height: theme.spacing(2),
        },
        input: {
            display: "flex",
            height: "auto",
            padding: 0,
        },
        noOptionsMessage: {
            padding: theme.spacing(1, 2),
        },
        paper: {
            left: 0,
            marginTop: theme.spacing(1),
            position: "absolute",
            right: 0,
            zIndex: 1,
        },
        placeholder: {
            bottom: 6,
            fontSize: 16,
            left: 2,
            position: "absolute",
        },
        root: {
            flexGrow: 1,
            minWidth: 290,
        },
        singleValue: {
            fontSize: 16,
        },
        valueContainer: {
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            overflow: "hidden",
        },
    })
);

const getSelectStyles = (theme: Theme) => {
    return {
        input: (base: CSSProperties) => ({
            ...base,
            "& input": {
                font: "inherit",
            },
            color: theme.palette.text.primary,
        }),
    };
};

interface IOwnProps {
    selectedTagValues: IOptionType[];
    allTagValues: IOptionType[];
    handleChangeMulti: (values: ValueType<IOptionType>) => void;
}

export const TagSearchDisplay = (props: IOwnProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const selectStyles = getSelectStyles(theme);

    return (
        <div className={classes.root}>
            <Select
                classes={classes}
                styles={selectStyles}
                inputId="react-select-multiple"
                TextFieldProps={{
                    InputLabelProps: {
                        htmlFor: "react-select-multiple",
                        shrink: true,
                    },
                    label: "Tags",
                }}
                placeholder="Filter by tag"
                options={props.allTagValues}
                components={{
                    Control,
                    Menu,
                    MultiValue,
                    NoOptionsMessage,
                    Option,
                    Placeholder,
                    SingleValue,
                    ValueContainer,
                }}
                value={props.selectedTagValues}
                onChange={props.handleChangeMulti}
                isMulti
            />
        </div>
    );
};
