import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import CancelIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Omit } from "@material-ui/types";
import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { ValueContainerProps } from "react-select/src/components/containers";
import { ControlProps } from "react-select/src/components/Control";
import { MenuProps, NoticeProps } from "react-select/src/components/Menu";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { OptionProps } from "react-select/src/components/Option";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { SingleValueProps } from "react-select/src/components/SingleValue";

export interface IOptionType {
    label: string;
    value: string;
}

export const NoOptionsMessage = (props: NoticeProps<IOptionType>) => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> &
    HTMLAttributes<HTMLDivElement>;

const inputComponent = ({ inputRef, ...props }: InputComponentProps) => (
    <div ref={inputRef} {...props} />
);

export const Control = (props: ControlProps<IOptionType>) => {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    children,
                    className: classes.input,
                    ref: innerRef,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
};

export const Option = (props: OptionProps<IOptionType>) => (
    <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
    >
        {props.children}
    </MenuItem>
);

type MuiPlaceholderProps = Omit<PlaceholderProps<IOptionType>, "innerProps"> &
    Partial<Pick<PlaceholderProps<IOptionType>, "innerProps">>;
export const Placeholder = (props: MuiPlaceholderProps) => {
    const { selectProps, innerProps = {}, children } = props;
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.placeholder}
            {...innerProps}
        >
            {children}
        </Typography>
    );
};

export const SingleValue = (props: SingleValueProps<IOptionType>) => (
    <Typography
        className={props.selectProps.classes.singleValue}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
);

export const ValueContainer = (props: ValueContainerProps<IOptionType>) => (
    <div className={props.selectProps.classes.valueContainer}>
        {props.children}
    </div>
);

export const MultiValue = (props: MultiValueProps<IOptionType>) => (
    <Chip
        tabIndex={-1}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
    />
);

export const Menu = (props: MenuProps<IOptionType>) => (
    <Paper
        square
        className={props.selectProps.classes.paper}
        {...props.innerProps}
    >
        {props.children}
    </Paper>
);
