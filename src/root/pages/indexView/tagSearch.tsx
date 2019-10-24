import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { createStyles, emphasize, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { Omit } from "@material-ui/types";
import clsx from "clsx";
import React, { CSSProperties, HTMLAttributes, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { ValueContainerProps } from "react-select/src/components/containers";
import { ControlProps } from "react-select/src/components/Control";
import { MenuProps, NoticeProps } from "react-select/src/components/Menu";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { OptionProps } from "react-select/src/components/Option";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { SingleValueProps } from "react-select/src/components/SingleValue";
import { OptionsType, ValueType } from "react-select/src/types";
import { getTagsLoadingAction } from "../../../store/actions/tags/getTags/actions";
import { IApplicationState } from "../../../store/rootReducer";

export interface IOptionType {
    label: string;
    value: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            minWidth: 290,
        },
        input: {
            display: "flex",
            padding: 0,
            height: "auto",
        },
        valueContainer: {
            display: "flex",
            flexWrap: "wrap",
            flex: 1,
            alignItems: "center",
            overflow: "hidden",
        },
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
        noOptionsMessage: {
            padding: theme.spacing(1, 2),
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: "absolute",
            left: 2,
            bottom: 6,
            fontSize: 16,
        },
        paper: {
            position: "absolute",
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing(2),
        },
    })
);

function NoOptionsMessage(props: NoticeProps<IOptionType>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> &
    HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
    return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<IOptionType>) {
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
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
}

function Option(props: OptionProps<IOptionType>) {
    return (
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
}

type MuiPlaceholderProps = Omit<PlaceholderProps<IOptionType>, "innerProps"> &
    Partial<Pick<PlaceholderProps<IOptionType>, "innerProps">>;
function Placeholder(props: MuiPlaceholderProps) {
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
}

function SingleValue(props: SingleValueProps<IOptionType>) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props: ValueContainerProps<IOptionType>) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}

function MultiValue(props: MultiValueProps<IOptionType>) {
    return (
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
}

function Menu(props: MenuProps<IOptionType>) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

export const TagSearch = (props: { setTags: (values: string[]) => void }) => {
    const { setTags } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTagsLoadingAction());
    }, []);

    const tags = useSelector((state: IApplicationState) => state.tags.tagsData);
    const tagIds = useSelector(
        (state: IApplicationState) => state.ui.filter.tagIds,
    );

    const tagValues = tagIds.map((tagId) => ({
        label: tagId,
        value: tagId,
    }));

    const suggestions: IOptionType[] = tags.map((tag) => ({
        label: tag.tagId,
        value: tag.tagId,
    }));

    const classes = useStyles();
    const theme = useTheme();

    const handleChangeMulti = (values: ValueType<IOptionType>) => {
        if (values) {
            setTags(
                (values as OptionsType<IOptionType>).map((value) => value.label),
            );
        } else {
            setTags([]);
        }
    };

    const selectStyles = {
        input: (base: CSSProperties) => ({
            ...base,
            "& input": {
                font: "inherit",
            },
            color: theme.palette.text.primary,
        }),
    };

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
                options={suggestions}
                components={components}
                value={tagValues}
                onChange={handleChangeMulti}
                isMulti
            />
        </div>
    );
};
