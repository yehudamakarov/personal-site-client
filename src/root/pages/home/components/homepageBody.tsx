import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Paper,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import { HomepageCardTextAbout } from "./cards/about/homepageCardTextAbout";
import { HomepageCard } from "./cards/homePageCard";
import { HomepageCardTextProjects } from "./cards/projects/homeCardTextProjects";

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
    );
};
