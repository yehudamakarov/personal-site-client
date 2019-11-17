import { Card, CardActionArea, createStyles, Grid, makeStyles, Theme, Tooltip, Typography } from "@material-ui/core";
import { Link } from "@reach/router";
import React from "react";
import TagsComponent from "../projects/components/tagsComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        div: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
        },
        grid: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
        growBeforeTags: {},
        root: {
            height: "100%",
        },
        tags: {
            padding: theme.spacing(2),
        },
    })
);
const IndexViewCard = (props: {
    title: string;
    subTitle: string | null;
    tagIds: string[];
    regularLink: string;
    githubLink: string | null;
    type: "project" | "blogPost";
}) => {
    const { title, subTitle, tagIds, regularLink, type } = props;
    const classes = useStyles();

    const truncateText = (str: string | null, desiredLength: number) => {
        if (!str) {
            return "";
        }
        if (str.length <= desiredLength) {
            return str;
        }
        const subString = str.substring(0, desiredLength - 1);
        let toLastSpace = subString.substring(0, subString.lastIndexOf(" "));
        const lastIsComma =
            toLastSpace.lastIndexOf(",") === toLastSpace.length - 1;
        if (lastIsComma) {
            toLastSpace = toLastSpace.substring(
                0,
                toLastSpace.lastIndexOf(",")
            );
        }
        const lastIsPeriod =
            toLastSpace.lastIndexOf(".") === toLastSpace.length - 1;
        if (lastIsPeriod) {
            toLastSpace = toLastSpace.substring(
                0,
                toLastSpace.lastIndexOf(".")
            );
        }
        return toLastSpace + "…";
    };

    const truncatedText = truncateText(subTitle, 60);

    const truncatedTypography = (
        <Typography variant="subtitle2">{truncatedText}</Typography>
    );

    const titleValue = (
        <Typography variant="subtitle2">
            {subTitle ? subTitle : title}
        </Typography>
    );

    return (
        <Card className={classes.root}>
            <div className={classes.div}>
                <Tooltip
                    placement="right-start"
                    className={classes.grid}
                    title={titleValue}
                >
                    <CardActionArea component={Link} to={regularLink}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h6">{title}</Typography>
                            </Grid>
                            <Grid item>{truncatedTypography}</Grid>
                        </Grid>
                    </CardActionArea>
                </Tooltip>
                {tagIds && (
                    <div className={classes.tags}>
                        <TagsComponent small rtl tags={tagIds} />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default IndexViewCard;
