import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITag } from "../../../store/entities/tags/actions/api";
import { closeTagMapSaveDialogAction } from "../../../store/entities/tagsTransferList/actions/closeTagMapSaveDialog";
import { mapTagLoadingAction } from "../../../store/entities/tagsTransferList/actions/mapTag";
import { IApplicationState } from "../../../store/rootReducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    }),
);

export const TagMapSaveDialog = (props: { tagId?: ITag["tagId"] }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const saveDialogIsOpen = useSelector((state: IApplicationState) => state.tagsTransferList.saveDialogIsOpen);

    const handleCancel = () => {
        dispatch(closeTagMapSaveDialogAction());
    };

    const handleSave = () => {
        if (props.tagId) {
            dispatch(mapTagLoadingAction(props.tagId));
        }
        dispatch(closeTagMapSaveDialogAction());
    };

    return (
        <Dialog open={saveDialogIsOpen}>
            <DialogTitle>Map current Tag?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tag the selected Blog Posts and Projects with the current tag? This will update every entity moved
                    to and from the left list, as well as the tag's article count.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} color={"secondary"}>
                    Map Tag
                </Button>
            </DialogActions>
        </Dialog>
    );
};
