import { Router } from "@reach/router";
import React from "react";
import { Routes } from "../store/ui/IUiState";
import { Navigation } from "./navigation/navigation";
import { AboutPage } from "./pages/about/aboutPage";
import { AddBlogPostPage } from "./pages/dashboard/addBlogPostPage";
import { DashboardPage } from "./pages/dashboard/dashboardPage";
import { TagsManagementPage } from "./pages/dashboard/tagsManagementPage";
import { TagsMapPage } from "./pages/dashboard/tagsMapPage";
import { Homepage } from "./pages/home/homepage";
import { IndexViewPage } from "./pages/indexView/indexViewPage";
import { LoginPage } from "./pages/login/loginPage";
import ProjectPage from "./pages/projects/projectPage";
import { TestPage } from "./pages/test/testPage";

export const Root = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Router>
                <Homepage path={Routes.home} />
                <LoginPage path={Routes.login} />
                <DashboardPage path={Routes.dashboard} />
                <TagsManagementPage path={Routes.dashboardTags} />
                <TagsMapPage path={Routes.dashboardTagsMapTagIdParam} />
                <AddBlogPostPage path={Routes.dashboardAddBlogPost} />
                <AboutPage path={Routes.about} />
                <ProjectPage path={Routes.projectsProjectNameParam} />
                <IndexViewPage path={Routes.projects} />
                <IndexViewPage path={Routes.blogPosts} />
                <IndexViewPage path={Routes.tags} />
                <IndexViewPage path={Routes.tagsTagIdParam} />
                <TestPage path={Routes.test} />
            </Router>
        </React.Fragment>
    );
};
