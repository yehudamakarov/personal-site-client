import {
    Button,
    Chip,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import WarningIcon from "@material-ui/icons/Warning";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../store/rootReducer";
import { deleteTagLoadingAction } from "../../../store/signalR/actions/JobStatusUpdateActions";
import { closeTagDeleteDialogAction } from "./actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    })
);

export const TagDeleteDialog = (props: {}) => {
    const dispatch = useDispatch();
    const deleteDialogIsOpen = useSelector((state: IApplicationState) => {
        return state.ui.tagDeleteDialog.tagDeleteDialogOpen;
    });
    const tagId = useSelector((state: IApplicationState) => {
        return state.ui.tagDeleteDialog.existingTagId;
    });

    const handleCancel = () => {
        dispatch(closeTagDeleteDialogAction());
    };

    const handleSave = () => {
        // todo if there is an if there is logic, take it out
        if (tagId) {
            dispatch(closeTagDeleteDialogAction());
            dispatch(deleteTagLoadingAction(tagId));
        }
    };

    return (
        <Dialog open={deleteDialogIsOpen}>
            <DialogTitle>Rename current Tag?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Would you like to delete{" "}
                    {<Chip component={"span"} size={"small"} icon={<LabelIcon />} label={tagId} />} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} variant={"outlined"} startIcon={<WarningIcon />}>
                    Delete Tag
                </Button>
            </DialogActions>
        </Dialog>
    );
};
