import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { roleType } from "../../../store/entities/auth/actions/authReducer";
import { Routes } from "../../../store/ui/IUiState";
import { BasePage } from "../basePage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
    }),
);

export const AddBlogPostPage = (props: RouteComponentProps) => {
    const classes = useStyles();

    return <BasePage backTo={Routes.dashboard} title={"Add Blog Post"} redirectIfNot={[roleType.administrator]} />;
};
