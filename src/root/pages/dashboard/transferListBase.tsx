import { createStyles, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { IFacade } from "../../../store/entities/projects/ui/selectors";
import { ISetCheckedBlogPosts } from "../../../store/entities/tagsTransferList/actions/setCheckedBlogPosts";
import { ISetCheckedProjects } from "../../../store/entities/tagsTransferList/actions/setCheckedProjects";
import { ISetLeftBlogPosts } from "../../../store/entities/tagsTransferList/actions/setLeftBlogPosts";
import { ISetLeftProjects } from "../../../store/entities/tagsTransferList/actions/setLeftProjects";
import { ISetRightBlogPosts } from "../../../store/entities/tagsTransferList/actions/setRightBlogPosts";
import { ISetRightProjects } from "../../../store/entities/tagsTransferList/actions/setRightProjects";
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

export const TransferListBase = (props: {
    title: string;
    checked: IFacade[];
    right: IFacade[];
    left: IFacade[];
    setChecked: (projects: IFacade[]) => ISetCheckedProjects | ISetCheckedBlogPosts;
    setRight: (projects: IFacade[]) => ISetRightProjects | ISetRightBlogPosts;
    setLeft: (projects: IFacade[]) => ISetLeftProjects | ISetLeftBlogPosts;
}) => {
    const classes = useStyles();

    const leftChecked = TransferListHelpers.intersection(props.checked, props.left);
    const rightChecked = TransferListHelpers.intersection(props.checked, props.right);

    const handleCheckedRight = () => {
        props.setRight(props.right.concat(leftChecked));
        props.setLeft(TransferListHelpers.not(props.left, leftChecked));
        props.setChecked(TransferListHelpers.not(props.checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        props.setLeft(props.left.concat(rightChecked));
        props.setRight(TransferListHelpers.not(props.right, rightChecked));
        props.setChecked(TransferListHelpers.not(props.checked, rightChecked));
    };

    return (
        <div>
            <Typography variant={"h6"}>{props.title}</Typography>
            <Divider />
            <Grid container spacing={2} alignItems="center" className={classes.root}>
                <Grid item>
                    <TransferList
                        title={"Mapped"}
                        items={props.left}
                        checked={props.checked}
                        setChecked={props.setChecked}
                    />
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
                    <TransferList
                        title={"Available to Map"}
                        items={props.right}
                        checked={props.checked}
                        setChecked={props.setChecked}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
