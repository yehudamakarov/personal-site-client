import { Router } from "@reach/router";
import React from "react";
import { Navigation } from "./navigation/navigation";
import { AboutPage } from "./pages/about/aboutPage";
import { Homepage } from "./pages/home/homepage";
import { IndexViewPage } from "./pages/indexView/indexViewPage";
import ProjectPage from "./pages/projects/projectPage";

export const Root = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Router>
                <Homepage path="/" />
                <AboutPage path="about" />
                <ProjectPage path="projects/:projectName" />
                <IndexViewPage path="projects" />
                <IndexViewPage path="blogPosts" />
                <IndexViewPage path="tags" />
            </Router>
        </React.Fragment>
    );
};
