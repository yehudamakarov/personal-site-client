import React from "react";
import { Routes } from "../../../store/ui/IUiState";
import { BasePage } from "../basePage";

export const AboutPage = (props: { path: string }) => {
    return <BasePage backTo={Routes.home} title={"About"} />;
};
