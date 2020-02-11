import { Button, createStyles, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            "&:hover": {
                backgroundColor: "transparent",
            },
        },
    }),
);
export const TagListItemActionButton = (props: { text: string; icon: React.ReactNode }) => {
    const classes = useStyles();
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    return (
        <Button fullWidth className={classes.button} endIcon={props.icon} size={isXs ? "small" : "medium"}>
            {props.text}
        </Button>
    );
};
