import { CircularProgress, createStyles, Fab, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReplayIcon from "@material-ui/icons/Replay";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import WarningIcon from "@material-ui/icons/Warning";
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { JobButtonStatus } from "../../../logic/dashboard/tags/rename/saga";
import { mapTagJobSuccessfulSelector } from "../../../store/entities/tagsTransferList/actions/sagas/saveMappedTagsSaga";
import {
    openTagMapSaveDialogAction,
    setCheckedAction,
    setLeftAction,
    setRightAction,
} from "../../../store/entities/tagsTransferList/actions/tagsTransferListActions";
import { FacadeIds } from "../../../store/entities/tagsTransferList/tagsTransferListReducer";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferList } from "./transferList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fabIcon: {
            [theme.breakpoints.up("sm")]: { marginRight: theme.spacing(1) },
        },
        fabSpan: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
        greenAvatarClassName: {
            backgroundColor: theme.palette.secondary.main,
        },
        list: {
            backgroundColor: theme.palette.background.paper,
            [theme.breakpoints.down("sm")]: {
                height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(33)}px)`,
            },
            [theme.breakpoints.up("sm")]: {
                height: `calc(90vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(33)}px)`,
            },
            [theme.breakpoints.up("md")]: {
                height: `calc(80vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(33)}px)`,
            },
            [theme.breakpoints.up("xl")]: {
                height: `calc(75vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(33)}px)`,
            },
            overflow: "auto",
        },
        redAvatarClassName: {
            backgroundColor: theme.palette.error.main,
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

export const TransferListBase = (props: { tagId?: string }) => {
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

    const checked = useSelector((state: IApplicationState) => state.tagsTransferList.checked);
    const right = useSelector((state: IApplicationState) => state.tagsTransferList.right);
    const left = useSelector((state: IApplicationState) => state.tagsTransferList.left);
    const initialLeft = useSelector((state: IApplicationState) => state.tagsTransferList.initialLeft);
    const initialRight = useSelector((state: IApplicationState) => state.tagsTransferList.initialRight);

    const tagIdKey = props.tagId ? props.tagId : "";
    const jobStatus = useSelector(mapTagJobSuccessfulSelector(tagIdKey, (state) => state.jobStatus.mapTagStatus));

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
        dispatch(openTagMapSaveDialogAction());
    };

    const handleReset = () => {
        dispatch(setLeftAction(initialLeft));
        dispatch(setRightAction(initialRight));
    };

    const decideIconColorForMapped = (value: string) => {
        if (initialLeft.indexOf(value) === -1) {
            return classes.greenAvatarClassName;
        }
    };
    const decideIconColorForAvailableToMap = (value: string) => {
        if (initialLeft.indexOf(value) !== -1) {
            return classes.redAvatarClassName;
        }
    };
    const noChangesToLeftSide = _.isEqual(_.sortBy(initialLeft), _.sortBy(left));

    const leftList = (
        <TransferList
            initial={initialLeft}
            listClassName={classes.list}
            title={"Mapped"}
            items={left}
            checked={checked}
            setChecked={setChecked}
            iconColorDecider={decideIconColorForMapped}
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
            iconColorDecider={decideIconColorForAvailableToMap}
            initial={initialLeft}
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
        // todo this component should be reusable and pass the JobButtonStatus as a prop
        <Fab
            onClick={handleSave}
            classes={{ label: classes.fabSpan }}
            variant={isXs ? "round" : "extended"}
            color={"secondary"}
            size={"small"}
            disabled={noChangesToLeftSide || jobStatus !== JobButtonStatus.Default}
        >
            {jobStatus === JobButtonStatus.Default && <SaveOutlinedIcon className={classes.fabIcon} />}
            {jobStatus === JobButtonStatus.InProgress && (
                <CircularProgress color={"inherit"} size={20} className={classes.fabIcon} />
            )}
            {jobStatus === JobButtonStatus.Warning && <WarningIcon className={classes.fabIcon} />}
            {isXs ? "" : "Save Changes"}
        </Fab>
    );
    const resetButton = (
        <Fab
            onClick={handleReset}
            variant={isXs ? "round" : "extended"}
            size={"small"}
            classes={{ label: classes.fabSpan }}
        >
            <ReplayIcon className={classes.fabIcon} />
            {isXs ? "" : "Reset"}
        </Fab>
    );

    return (
        <div className={classes.root}>
            {isXs ? (
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
                        <Grid item container xs justify={"flex-end"} alignItems={"center"} spacing={1}>
                            <Grid item>{resetButton}</Grid>
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
                            <Grid item>{saveButton}</Grid>
                            <Grid item>{resetButton}</Grid>
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
