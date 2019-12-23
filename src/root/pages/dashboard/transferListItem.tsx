import {
    Avatar,
    createStyles,
    ListItemAvatar,
    ListItemSecondaryAction,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import WorkIcon from "@material-ui/icons/Work";
import { Link } from "@reach/router";
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
        tagSecondaryText: {
            display: "block",
        },
    }),
);
export const TransferListItem = (props: {
    onClick: () => void;
    checked: boolean;
    searchElement: TransferListFacadeId;
}) => {
    const classes = useStyles();
    const element = useSelector(facadeItemSelector(props.searchElement));

    return (
        <ListItem role="listitem" button component={Link} to={element.link} alignItems={"flex-start"}>
            <ListItemAvatar>
                <Avatar>
                    {element.type === FacadeType.BlogPost && <NotesRoundedIcon />}
                    {element.type === FacadeType.Project && <WorkIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                id={`transfer-list-all-item-${props.searchElement}-label`}
                primaryTypographyProps={{ variant: "button" }}
                primary={element.title}
                secondary={
                    element.tagIds ? (
                        <React.Fragment>
                            {element.tagIds.map((tagId) => (
                                <Typography variant={"caption"} className={classes.tagSecondaryText} key={tagId}>
                                    {tagId}
                                </Typography>
                            ))}
                        </React.Fragment>
                    ) : (
                        <Typography className={classes.tagSecondaryText} variant={"caption"}>
                            No Tags
                        </Typography>
                    )
                }
            />
            <ListItemSecondaryAction>
                <Checkbox
                    edge={"end"}
                    onClick={props.onClick}
                    checked={props.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": `transfer-list-all-item-${props.searchElement}-label` }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
};
