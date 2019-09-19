import {
    Avatar,
    Chip,
    createStyles,
    Grid,
    makeStyles,
    Theme,
} from "@material-ui/core";
import { Link } from "@reach/router";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {},
    })
);

const TagsComponent = (props: { tags: string[]; rtl: boolean }) => {
    const { rtl, tags } = props;
    const direction = rtl ? "row-reverse" : "row";
    return (
        <Grid container spacing={1} direction={direction}>
            {tags &&
                tags.map((tag) => {
                    return (
                        <Grid item key={tag}>
                            <Chip
                                label={tag}
                                component={Link}
                                to={`/tags/${tag}`}
                                clickable
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default TagsComponent;
