import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BasePage } from "../basePage";

export const TestPage = (props: { path: string }) => {
    const dispatch = useDispatch();
    const handleClick = (event: any) => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}authentication/testAuthentication`,
            )
            .then((response) => console.log(response));
    };

    return (
        <BasePage>
            <Typography variant="h4">Test</Typography>
            <Button onClick={handleClick}>test auth</Button>
        </BasePage>
    );
};
