import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { closeTagRenameDialogAction, renameTagLoadingAction } from "./actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    }),
);

export const TagRenameDialog = (props: {}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [newTagId, setNewTagId] = useState("");
    const renameDialogIsOpen = useSelector((state: IApplicationState) => {
        return state.ui.tagRenameDialog.tagRenameDialogOpen;
    });
    const existingTagId = useSelector((state: IApplicationState) => {
        return state.ui.tagRenameDialog.existingTagId;
    });
    const handleCancel = () => {
        dispatch(closeTagRenameDialogAction());
    };
    const handleSave = () => {

        dispatch(renameTagLoadingAction(existingTagId, newTagId));
    };
    return <div className={classes.root} />;
};
