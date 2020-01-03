import {
    Avatar,
    Chip,
    createStyles,
    ListItemAvatar,
    ListItemIcon,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LabelIcon from "@material-ui/icons/Label";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import WorkIcon from "@material-ui/icons/Work";
import React from "react";
import { useSelector } from "react-redux";
import { FacadeType } from "../../../store/entities/projects/ui/selectors";
import { TransferListFacadeId } from "../../../store/entities/tagsTransferList/tagsTransferListReducer";
import { IApplicationState } from "../../../store/rootReducer";

const facadeItemSelector = (facadeId: TransferListFacadeId) => (state: IApplicationState) => {
    return state.tagsTransferList.facadeItems[facadeId];
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarIcon: {
            // backgroundColor: theme.palette.primary.light,
        },
        chip: {
            marginRight: theme.spacing(0.5),
            marginTop: theme.spacing(0.5),
        },
        tagSecondaryText: {
            display: "block",
        },
    })
);
export const TransferListItem = (props: {
    onClick: () => void;
    checked: boolean;
    searchElement: TransferListFacadeId;
    avatarColorClassName?: string;
}) => {
    const classes = useStyles();
    const element = useSelector(facadeItemSelector(props.searchElement));

    return (
        <ListItem role="listitem" button onClick={props.onClick} alignItems={"flex-start"}>
            <ListItemAvatar>
                <Avatar className={props.avatarColorClassName}>
                    {element.type === FacadeType.BlogPost && <NotesRoundedIcon />}
                    {element.type === FacadeType.Project && <WorkIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                id={`transfer-list-all-item-${props.searchElement}-label`}
                primaryTypographyProps={{ variant: "subtitle2" }}
                primary={element.title}
                secondary={
                    element.tagIds.length > 0 ? (
                        <React.Fragment>
                            {element.tagIds.map((tagId) => (
                                <Chip
                                    component={"span"}
                                    key={tagId}
                                    className={classes.chip}
                                    // color="primary"
                                    size="small"
                                    icon={<LabelIcon />}
                                    label={tagId}
                                />
                            ))}
                        </React.Fragment>
                    ) : (
                        <Typography className={classes.tagSecondaryText} variant={"caption"}>
                            No Tags
                        </Typography>
                    )
                }
            />
            <ListItemIcon>
                <Checkbox
                    color={"primary"}
                    edge={"end"}
                    checked={props.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": `transfer-list-all-item-${props.searchElement}-label` }}
                />
            </ListItemIcon>
        </ListItem>
    );
};
