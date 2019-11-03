import { createStyles, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from "@material-ui/core";
import PageviewTwoToneIcon from "@material-ui/icons/PageviewTwoTone";
import { Link } from "@reach/router";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export const TagListItem = (props: { name: string; onClick: () => void }) => {
    const classes = useStyles();

    return (
        <ListItem
            button
            className={classes.root}
            onClick={props.onClick}
            component={Link}
            to={`tags/${props.name}`}
        >
            <ListItemIcon>
                <PageviewTwoToneIcon />
            </ListItemIcon>
            <ListItemText
                primaryTypographyProps={{ variant: "overline" }}
                primary={props.name}
            />
        </ListItem>
    );
};
