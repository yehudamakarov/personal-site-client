import React from 'react'
import { Typography, Grid } from '@material-ui/core';

const HomepageCardTextAbout = () => {
    return (
        <Grid container>
            {/* Top Header */}
            <Grid item xs={12}>
                <Typography variant="h3">
                    About
                </Typography>
            </Grid>
            {/* Caption and sub caption */}
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="subtitle2" >
                    I work as a Software Engineer at On.Care and I also coach students in the Flatiron School. I'm a father and a husband, and I love working with people to do the best.
                </Typography>

            </Grid>
        </Grid>

    )
}

export { HomepageCardTextAbout }
