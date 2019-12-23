import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { setCheckedAction } from "../../../store/entities/tagsTransferList/actions/setChecked";
import { setLeftAction } from "../../../store/entities/tagsTransferList/actions/setLeft";
import { setRightAction } from "../../../store/entities/tagsTransferList/actions/setRight";
import { FacadeIds } from "../../../store/entities/tagsTransferList/tagsTransferListReducer";
import { IApplicationState } from "../../../store/rootReducer";
import { TransferList } from "./transferList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(0.5, 0),
        },
        root: {
            margin: "auto",
        },
    })
);

export const TransferListBase = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setChecked = (facadeIds: FacadeIds) => dispatch(setCheckedAction(facadeIds));
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

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(TransferListHelpers.not(left, leftChecked));
        setChecked(TransferListHelpers.not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(TransferListHelpers.not(right, rightChecked));
        setChecked(TransferListHelpers.not(checked, rightChecked));
    };

    return (
        <div>
            <Grid container spacing={2} alignItems="center" className={classes.root}>
                <Grid item>
                    <TransferList title={"Mapped"} items={left} checked={checked} setChecked={setChecked} />
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <TransferList title={"Available to Map"} items={right} checked={checked} setChecked={setChecked} />
                </Grid>
            </Grid>
        </div>
    );
};
