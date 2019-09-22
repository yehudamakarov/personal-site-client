import {
    Card,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import TagsComponent from "../projects/components/tagsComponent";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100%",
            // minHeight: 300,
            padding: theme.spacing(1),
            position: "relative",
        },
        tagsOnBottom: {
            // height: "100%",
            position: "absolute",
            bottom: 0,
            right: 0,
            height: theme.spacing(12),
            padding: theme.spacing(1),
        },
        placeHolder: {
            height: theme.spacing(12),
        },
    })
);
const IndexViewCard = (props: {
    title: string;
    subTitle: string;
    tagIds: string[];
}) => {
    const { title, subTitle, tagIds } = props;
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Grid
                container
                justify="space-between"
                direction="column"
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h6">{title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">{subTitle}</Typography>
                </Grid>
                <Grid item>
                    <div className={classes.placeHolder} />
                </Grid>
            </Grid>
            <TagsComponent className={classes.tagsOnBottom} rtl tags={tagIds} />
        </Card>
    );
};

export default IndexViewCard;
