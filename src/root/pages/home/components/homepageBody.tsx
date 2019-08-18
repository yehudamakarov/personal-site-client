import React from 'react'
import { Container, Typography, Paper, Grid, CardActionArea, CardContent, Card, CardMedia, Theme } from '@material-ui/core';
import { HomepageCard } from './cards/homePageCard';




export const HomepageBody = () => {
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <HomepageCard to="about">
                        <Typography variant="h3">
                            About
                        </Typography>
                    </HomepageCard>
                </Grid>
                <Grid item xs={12}>
                    <HomepageCard to="projects">
                        <Typography variant="h3">
                            Projects
                        </Typography>
                    </HomepageCard>
                </Grid>
            </Grid>
        </Container>
    )
}
