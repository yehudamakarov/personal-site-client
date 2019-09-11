import { Button, Typography } from "@material-ui/core";
import { Router } from "@reach/router";
import React from "react";
import { MainNavDrawer } from "./navigation/drawer/mainNavDrawer";
import { Navigation } from "./navigation/navigation";
import { TopBar } from "./navigation/topBar/topBar";
import { AboutPage } from "./pages/about/aboutPage";
import { BlogPage } from "./pages/blog/blogPage";
import { Homepage } from "./pages/home/homepage";
import ProjectPage from "./pages/projects/projectPage";
import { ProjectsPage } from "./pages/projects/projectsPage";

export const Root = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Router>
                <Homepage path="/" />
                <AboutPage path="about" />
                <ProjectsPage path="projects" />
                <ProjectPage path="projects/:projectName" />
                <BlogPage path="blog" />
            </Router>
        </React.Fragment>
    );
};
