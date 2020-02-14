import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Routes } from "../../../store/ui/IUiState";
import { BasePage } from "../basePage";

export const TestPage = (props: { path: string }) => {
    const dispatch = useDispatch();
    const handleClick = (event: any) => {
        axios.get(`/authentication/testAuthentication`).then((response) => console.log(response));
    };

    return (
        <BasePage backTo={Routes.home} title={"Test Page"}>
            <Button onClick={handleClick}>test auth</Button>
        </BasePage>
    );
};
