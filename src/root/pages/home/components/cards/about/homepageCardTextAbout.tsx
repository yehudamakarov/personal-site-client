import { Grid, Typography } from "@material-ui/core";
import React from "react";

const HomepageCardTextAbout = () => {
    return (
        <Grid container spacing={2}>
            {/* Top Header */}
            <Grid item xs={12}>
                <Typography variant="h4">About</Typography>
            </Grid>
            {/* Caption and sub caption */}
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="subtitle2">
                    I work as a Software Engineer at On.Care and I coach
                    students in the Flatiron School. I'm a father as well as a
                    husband, and I love working with people to do the best.
                </Typography>
            </Grid>
        </Grid>
    );
};

export { HomepageCardTextAbout };
