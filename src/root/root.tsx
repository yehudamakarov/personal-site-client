import React from 'react'
import { Button, Typography } from "@material-ui/core"
import { Router } from "@reach/router"
import { TopBar } from "./navigation/topBar/topBar";
import { MainNavDrawer } from "./navigation/drawer/mainNavDrawer"
import { Navigation } from './navigation/navigation';
import { Homepage } from './pages/home/homepage';
import { AboutPage } from './pages/about/aboutPage';
import { ProjectsPage } from './pages/projects/projectsPage';
import { BlogPage } from './pages/blog/blogPage';


export const Root = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Router>
                <Homepage path="/" />
                <AboutPage path="about" />
                <ProjectsPage path="projects" />
                <BlogPage path="blog" />
            </Router>
        </React.Fragment>
    )
}
