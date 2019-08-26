import React from 'react'
import { Container, Typography, Paper, Grid, CardActionArea, CardContent, Card, CardMedia, Theme } from '@material-ui/core';
import { HomepageCard } from './cards/homePageCard';
import { HomepageCardTextAbout } from './cards/about/homepageCardTextAbout';
import { HomepageCardTextProjects } from './cards/projects/HomeCardTextProjects';




export const HomepageBody = () => {
    return (
        <Container>
            <Grid container spacing={4}>
                {/* About card */}
                <Grid item xs={12}>
                    <HomepageCard to="about">
                        <HomepageCardTextAbout />
                    </HomepageCard>
                </Grid>
                {/* Projects card */}
                <Grid item xs={12}>
                    <HomepageCard to="projects">
                        <HomepageCardTextProjects />
                    </HomepageCard>
                </Grid>
            </Grid>
        </Container>
    )
}
