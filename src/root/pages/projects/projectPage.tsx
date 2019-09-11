import { Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProjectByNameLoadingAction } from "../../../store/projects/actions/getProjectByName";
import { BasePage } from "../basePage";

interface IOwnProps extends RouteComponentProps<{ projectName?: string }> {}

const ProjectPage = (props: IOwnProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectByNameLoadingAction(props.projectName));
    }, []);
    return (
        <BasePage>
            <Typography variant="h3">{props.projectName}</Typography>
        </BasePage>
    );
};

export default ProjectPage;
