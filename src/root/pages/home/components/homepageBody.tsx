import { Container, Grid } from "@material-ui/core";
import React from "react";
import { HomepageCardTextAbout } from "./cards/about/homepageCardTextAbout";
import { HomepageCard } from "./cards/homePageCard";
import { HomepageCardTextPinnedRepositories } from "./cards/pinnedRepositories/homeCardTextPinnedRepositories";

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
                {/* PinnedRepositories card */}
                <Grid item xs={12}>
                    <HomepageCard to="projects">
                        <HomepageCardTextPinnedRepositories />
                    </HomepageCard>
                </Grid>
            </Grid>
        </Container>
    );
};
