import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
} from "@material-ui/core";
import DeleteSweepTwoToneIcon from "@material-ui/icons/DeleteSweepTwoTone";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { navigate } from "@reach/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTagIdBeingDeletedAction } from "../../../logic/dashboard/tags/map";
import { Tag } from "../../../store/entities/tags/actions/api";
import { IApplicationState } from "../../../store/rootReducer";
import { Routes } from "../../../store/ui/IUiState";
import { openTagDeleteDialogAction, openTagRenameDialogAction } from "./actions";
import { TagListItemActionButton } from "./tagListItemActionButton";

const tagSelector = (tagId: Tag["tagId"]) => (state: IApplicationState) =>
    state.tags.tagsData.find((tag) => tag.tagId === tagId);

export const TagsManagementTagListItem = (props: { tagId: Tag["tagId"] }) => {
    const tag = useSelector(tagSelector(props.tagId));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMapSelect = async () => {
        handleMenuClose();
        await navigate(Routes.dashboardTagsMap + props.tagId);
    };

    // todo how can this immediately link to the dialog
    const handleRenameSelect = () => {
        dispatch(openTagRenameDialogAction(props.tagId));
        handleMenuClose();
    };

    const handleDeleteSelect = () => {
        dispatch(openTagDeleteDialogAction(props.tagId));
        dispatch(setCurrentTagIdBeingDeletedAction(props.tagId));
        handleMenuClose();
    };

    return tag ? (
        <ListItem>
            <ListItemAvatar>
                <Avatar>{tag.articleCount ? tag.articleCount : 0}</Avatar>
            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{ variant: "subtitle2" }} primary={tag.tagId} />
            <ListItemSecondaryAction>
                <IconButton edge={"end"} onClick={handleMenuOpen}>
                    <MenuOpenIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMapSelect}>
                        <TagListItemActionButton text={"Map"} icon={<SyncAltIcon />} />
                    </MenuItem>
                    <MenuItem onClick={handleRenameSelect}>
                        <TagListItemActionButton text={"Rename"} icon={<SpellcheckIcon />} />
                    </MenuItem>
                    <MenuItem onClick={handleDeleteSelect}>
                        <TagListItemActionButton text={"Delete"} icon={<DeleteSweepTwoToneIcon />} />
                    </MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    ) : (
        <ListItem />
    );
};
