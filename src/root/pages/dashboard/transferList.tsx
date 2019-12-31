import { CircularProgress, LinearProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { ISetChecked } from "../../../store/entities/tagsTransferList/actions/setChecked";
import { FacadeIds, TransferListFacadeId } from "../../../store/entities/tagsTransferList/tagsTransferListReducer";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferListItem } from "./transferListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardHeader: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(1, 2),
        },
        progress: {
            textAlign: "center",
        },
    })
);

export const TransferList = (props: {
    title: React.ReactNode;
    items: FacadeIds;
    checked: FacadeIds;
    setChecked: (facadeIds: FacadeIds) => ISetChecked;
    listClassName?: string;
}) => {
    const classes = useStyles();
    const isLoading = useSelector((state: IApplicationState) => {
        return state.tagsTransferList.allIsLoading;
    });

    const handleToggleAll = (items: FacadeIds) => () => {
        if (numberOfChecked(items) === items.length) {
            props.setChecked(TransferListHelpers.not(props.checked, items));
        } else {
            props.setChecked(TransferListHelpers.union(props.checked, items));
        }
    };

    const numberOfChecked = (items: FacadeIds) => TransferListHelpers.intersection(props.checked, items).length;

    const handleToggle = (value: TransferListFacadeId) => () => {
        const currentIndex = props.checked.findIndex((facadeId) => facadeId === value);
        const newChecked = [...props.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        props.setChecked(newChecked);
    };

    const titleCheckbox = (
        <Checkbox
            color={"default"}
            onClick={handleToggleAll(props.items)}
            checked={numberOfChecked(props.items) === props.items.length && props.items.length !== 0}
            indeterminate={numberOfChecked(props.items) !== props.items.length && numberOfChecked(props.items) !== 0}
            disabled={props.items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
        />
    );

    return (
        <Card>
            {isLoading ? (
                <LinearProgress variant={"query"} />
            ) : (
                <CardHeader
                    className={classes.cardHeader}
                    avatar={titleCheckbox}
                    titleTypographyProps={{ variant: "subtitle2" }}
                    subheaderTypographyProps={{ variant: "body2", color: "inherit" }}
                    title={props.title}
                    subheader={`${numberOfChecked(props.items)}/${props.items.length} selected`}
                />
            )}
            <Divider />

            <List className={props.listClassName} dense component="div" role="list">
                {isLoading ? (
                    <div className={classes.progress}>
                        <CircularProgress variant={"indeterminate"} />
                    </div>
                ) : (
                    props.items.map((value: TransferListFacadeId) => {
                        return (
                            <TransferListItem
                                key={value}
                                onClick={handleToggle(value)}
                                checked={props.checked.indexOf(value) !== -1}
                                searchElement={value}
                            />
                        );
                    })
                )}
                <ListItem />
            </List>
        </Card>
    );
};
