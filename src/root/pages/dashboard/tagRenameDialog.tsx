import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField,
    Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { renameTagLoadingAction } from "../../../store/signalR/actions/JobStatusUpdateActions";
import { closeTagRenameDialogAction } from "./actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    })
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
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTagId(event.target.value);
    };
    const handleSave = () => {
        if (existingTagId) {
            dispatch(closeTagRenameDialogAction());
            dispatch(renameTagLoadingAction(existingTagId, newTagId));
        }
    };

    return (
        <Dialog open={renameDialogIsOpen}>
            <DialogTitle>Rename current Tag?</DialogTitle>
            <DialogContent>
                <DialogContentText>Would you like to rename the current tag?</DialogContentText>
                <TextField
                    size={"small"}
                    placeholder={existingTagId ? existingTagId : undefined}
                    helperText={"New tag name"}
                    value={newTagId}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} color={"secondary"}>
                    Rename Tag
                </Button>
            </DialogActions>
        </Dialog>
    );
};
