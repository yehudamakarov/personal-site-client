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
            padding: theme.spacing(1),
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
        <Card className={classes.root} square>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Typography variant="h6">{title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">{subTitle}</Typography>
                </Grid>
                <Grid item>
                    <TagsComponent rtl tags={tagIds} />
                </Grid>
            </Grid>
        </Card>
    );
};

export default IndexViewCard;
