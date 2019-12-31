import { createStyles, Fab, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { ITag } from "../../../store/entities/tags/actions/api";
import { mapTagLoadingAction } from "../../../store/entities/tagsTransferList/actions/mapTag";
import { setCheckedAction } from "../../../store/entities/tagsTransferList/actions/setChecked";
import { setLeftAction } from "../../../store/entities/tagsTransferList/actions/setLeft";
import { setRightAction } from "../../../store/entities/tagsTransferList/actions/setRight";
import { FacadeIds } from "../../../store/entities/tagsTransferList/tagsTransferListReducer";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferList } from "./transferList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fabIcon: {
            marginRight: theme.spacing(1),
        },
        fabSpan: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            [theme.breakpoints.down("xs")]: {
                height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(30)}px)`,
            },
            [theme.breakpoints.up("sm")]: {
                height: `calc(90vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(32)}px)`,
            },
            [theme.breakpoints.up("md")]: {
                height: `calc(80vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(32)}px)`,
            },
            [theme.breakpoints.up("xl")]: {
                height: `calc(75vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(32)}px)`,
            },
            overflow: "auto",
        },
        root: {
            [theme.breakpoints.down("xs")]: {
                marginTop: theme.spacing(1),
            },
            [theme.breakpoints.up("sm")]: {
                marginTop: theme.spacing(3),
            },
        },
        toggleButton: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.primary.contrastText} !important`,
        },
    })
);

export const TransferListBase = (props: { tagId?: ITag["tagId"] }) => {
    const classes = useStyles();
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    const dispatch = useDispatch();

    const [currentList, switchVisibleTransferList] = React.useState("left");
    const handleChangeList = (event: React.MouseEvent<HTMLElement>, value: "left" | "right") => {
        switchVisibleTransferList(value);
    };

    const setChecked = (facadeIds: FacadeIds, meta?: string) => dispatch(setCheckedAction(facadeIds, meta));
    const setRight = (facadeIds: FacadeIds) => dispatch(setRightAction(facadeIds));
    const setLeft = (facadeIds: FacadeIds) => dispatch(setLeftAction(facadeIds));

    const checkedSelector = (state: IApplicationState) => state.tagsTransferList.checked;
    const leftSelector = (state: IApplicationState) => state.tagsTransferList.left;
    const rightSelector = (state: IApplicationState) => state.tagsTransferList.right;

    const checked = useSelector(checkedSelector);
    const right = useSelector(rightSelector);
    const left = useSelector(leftSelector);

    const leftChecked = TransferListHelpers.intersection(checked, left);
    const rightChecked = TransferListHelpers.intersection(checked, right);

    const moveCheckedItemsFromRightToLeft = () => {
        setRight(right.concat(leftChecked));
        setLeft(TransferListHelpers.not(left, leftChecked));
        setChecked(TransferListHelpers.not(checked, leftChecked), "moveCheckedItemsFromRightToLeft");
    };

    const moveCheckedItemsFromLeftToRight = () => {
        setLeft(left.concat(rightChecked));
        setRight(TransferListHelpers.not(right, rightChecked));
        setChecked(TransferListHelpers.not(checked, rightChecked), "moveCheckedItemsFromLeftToRight");
    };

    const handleSave = () => {
        if (props.tagId) {
            dispatch(mapTagLoadingAction(props.tagId));
        }
    };

    const leftList = (
        <TransferList
            listClassName={classes.list}
            title={"Mapped"}
            items={left}
            checked={checked}
            setChecked={setChecked}
        />
    );
    const leftButton = (
        <Button
            endIcon={<ArrowForwardIcon />}
            fullWidth
            color={"primary"}
            variant="contained"
            onClick={moveCheckedItemsFromRightToLeft}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
        >
            Un-map Tag
        </Button>
    );
    const rightList = (
        <TransferList
            listClassName={classes.list}
            title={"Available to Map"}
            items={right}
            checked={checked}
            setChecked={setChecked}
        />
    );
    const rightButton = (
        <Button
            startIcon={<ArrowBackIcon />}
            color={"primary"}
            fullWidth
            variant="contained"
            onClick={moveCheckedItemsFromLeftToRight}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
        >
            Map Tag
        </Button>
    );
    const saveButton = (
        <Fab
            onClick={handleSave}
            classes={{ label: classes.fabSpan }}
            variant={"extended"}
            color={"secondary"}
            size={"small"}
        >
            <SaveOutlinedIcon className={classes.fabIcon} />
            save
        </Fab>
    );

    return (
        <div className={classes.root}>
            {isXs ? (
                // ToggleButton on top, use words of title
                // set state on switch to show either the left list and left button, or the right list and right button
                <div>
                    <Grid container justify={"center"} spacing={1}>
                        <Grid item>
                            <ToggleButtonGroup size={"small"} exclusive value={currentList} onChange={handleChangeList}>
                                <ToggleButton classes={{ selected: classes.toggleButton }} value={"left"}>
                                    Mapped
                                </ToggleButton>
                                <ToggleButton classes={{ selected: classes.toggleButton }} value={"right"}>
                                    Available To Map
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item container xs justify={"flex-end"} alignItems={"center"}>
                            <Grid item>{saveButton}</Grid>
                        </Grid>
                        {currentList === "left" && (
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        {leftList}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {leftButton}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {currentList === "right" && (
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        {rightList}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {rightButton}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </div>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {leftList}
                            </Grid>
                            <Grid item xs={12}>
                                {leftButton}
                            </Grid>
                            <Grid item xs={12}>
                                {saveButton}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {rightList}
                            </Grid>
                            <Grid item xs={12}>
                                {rightButton}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
