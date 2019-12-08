import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransferListHelpers } from "../../../helpers/transferListHelpers";
import { facadeSelector, IFacade } from "../../../store/entities/projects/ui/selectors";
import { ITag } from "../../../store/entities/tags/actions/api";
import { setCheckedProjectsAction } from "../../../store/entities/tagsTransferList/actions/setCheckedProjects";
import { setLeftProjectsAction } from "../../../store/entities/tagsTransferList/actions/setLeftProjects";
import { setRightProjectsAction } from "../../../store/entities/tagsTransferList/actions/setRightProjects";
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

export const TransferListForProjectsAndBlogPosts = (props: { tagId?: ITag["tagId"] }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const projectFacades = useSelector(
        facadeSelector((state: IApplicationState) =>
            state.projects.projectsData.map((project) => ({
                id: project.githubRepoDatabaseId,
                tagIds: project.tagIds,
                title: project.projectTitle,
            }))
        )
    );

    const checked = useSelector((state: IApplicationState) => state.tagsTransferList.projects.checked);
    const left = useSelector((state: IApplicationState) => state.tagsTransferList.projects.left);
    const right = useSelector((state: IApplicationState) => state.tagsTransferList.projects.right);

    const setChecked = (projects: IFacade[]) => dispatch(setCheckedProjectsAction(projects));
    const setLeft = (projects: IFacade[]) => dispatch(setLeftProjectsAction(projects));
    const setRight = (projects: IFacade[]) => dispatch(setRightProjectsAction(projects));

    useEffect(() => {
        const mappedToTag = projectFacades.filter(
            (projectFacade) => projectFacade.tagIds && projectFacade.tagIds.some((tagId) => tagId === props.tagId)
        );
        const availableToMapToTag = projectFacades.filter(
            (projectFacade) =>
                projectFacade.tagIds === null || projectFacade.tagIds.every((tagId) => tagId !== props.tagId)
        );
        dispatch(setLeft(mappedToTag));
        dispatch(setRight(availableToMapToTag));
    }, [projectFacades.length]);

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
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
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
    );
};
