import { Grid, Typography } from "@material-ui/core";
import React from "react";

const HomepageCardTextPinnedRepositories = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Some Projects</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="subtitle2">
                    These are my pinned repositories on Github.
                </Typography>
            </Grid>
        </Grid>
    );
};

export { HomepageCardTextPinnedRepositories };
