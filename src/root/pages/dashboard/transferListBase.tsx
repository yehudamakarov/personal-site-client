import { createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { IFacade } from "../../../store/entities/projects/ui/selectors";
import { setCheckedAction } from "../../../store/entities/tagsTransferList/actions/setChecked";
import { setLeftAction } from "../../../store/entities/tagsTransferList/actions/setLeft";
import { setRightAction } from "../../../store/entities/tagsTransferList/actions/setRight";
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
    }),
);

export const TransferListBase = (props: { title: string }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setChecked = (elements: IFacade[]) => dispatch(setCheckedAction(elements));
    const setRight = (elements: IFacade[]) => dispatch(setRightAction(elements));
    const setLeft = (elements: IFacade[]) => dispatch(setLeftAction(elements));

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
            <Typography variant={"h6"}>{props.title}</Typography>
            <Divider />
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
