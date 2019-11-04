import { Router } from "@reach/router";
import React from "react";
import { Routes } from "../store/ui/IUiState";
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
                <Homepage path={Routes.home} />
                <AboutPage path={Routes.about} />
                <ProjectPage path={Routes.projectsProjectNameParam} />
                <IndexViewPage path={Routes.projects} />
                <IndexViewPage path={Routes.blogPosts} />
                <IndexViewPage path={Routes.tags} />
                <IndexViewPage path={Routes.tagsTagIdParam} />
            </Router>
        </React.Fragment>
    );
};
