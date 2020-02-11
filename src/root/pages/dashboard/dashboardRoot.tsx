import { Router } from "@reach/router";
import React from "react";
import { DashboardRoute } from "../../../store/ui/IUiState";

export const DashboardRoot = (props: { path: DashboardRoute }) => {
    return (
        <React.Fragment>
            <Router>

            </Router>
        </React.Fragment>
    );
};
