/* eslint-disable react-hooks/exhaustive-deps */
import { createStyles, emphasize, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import React, { CSSProperties } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
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
} from "./tagSearchHelpers";

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
        list: {
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
    editable: boolean;
}

export const TagSearchDisplay = (props: IOwnProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const selectStyles = getSelectStyles(theme);

    const selectProps = {
        TextFieldProps: {
            InputLabelProps: {
                htmlFor: "react-select-multiple",
                shrink: true,
            },
            label: "Tags",
        },
        classes,
        components: {
            Control,
            Menu,
            MultiValue,
            NoOptionsMessage,
            Option,
            Placeholder,
            SingleValue,
            ValueContainer,
        },
        inputId: "react-select-multiple",
        isMulti: true,
        onChange: props.handleChangeMulti,
        options: props.allTagValues,
        placeholder: "Filter by tag",
        styles: selectStyles,
        value: props.selectedTagValues,
    };

    return (
        <div className={classes.root}>
            {props.editable ? (
                <CreatableSelect {...selectProps} />
            ) : (
                <Select {...selectProps} />
            )}
        </div>
    );
};
