import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { IFacade } from "../../../store/entities/projects/ui/selectors";
import { ISetCheckedProjects } from "../../../store/entities/tagsTransferList/actions/setCheckedProjects";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardHeader: {
            padding: theme.spacing(1, 2),
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            height: 230,
            overflow: "auto",
            width: 200,
        },
    }),
);

export const CustomList = (props: {
    title: React.ReactNode;
    items: IFacade[];
    checked: IFacade[];
    setChecked: (projects: IFacade[]) => ISetCheckedProjects;
}) => {
    const classes = useStyles();

    const handleToggleAll = (items: IFacade[]) => () => {
        if (numberOfChecked(items) === items.length) {
            props.setChecked(TransferListHelpers.not(props.checked, items));
        } else {
            props.setChecked(TransferListHelpers.union(props.checked, items));
        }
    };

    const numberOfChecked = (items: IFacade[]) => TransferListHelpers.intersection(props.checked, items).length;

    const handleToggle = (value: IFacade) => () => {
        const currentIndex = props.checked.findIndex((facade) => facade.id === value.id);
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
            onClick={handleToggleAll(props.items)}
            checked={numberOfChecked(props.items) === props.items.length && props.items.length !== 0}
            indeterminate={numberOfChecked(props.items) !== props.items.length && numberOfChecked(props.items) !== 0}
            disabled={props.items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
        />
    );
    return (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={titleCheckbox}
                title={props.title}
                subheader={`${numberOfChecked(props.items)}/${props.items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {props.items.map((value: IFacade) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={props.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.title} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );
};
