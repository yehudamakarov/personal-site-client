import { Chip, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import { Link } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { IProject } from "../../../../store/actions/projects/api";
import { IApplicationState } from "../../../../store/rootReducer";
import { TagEditContainer } from "./tagEditContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {},
    })
);

const TagsComponent = (props: {
    tags: string[];
    rtl?: boolean;
    small?: boolean;
    project?: IProject | undefined;
}) => {
    const projectId = props.project
        ? (props.project.githubRepoDatabaseId as string)
        : undefined;
    const projectIsEditable = useSelector((state: IApplicationState) => {
        if (projectId) {
            return state.projects.projectsUi.singleIsEditing[projectId];
        } else {
            return false;
        }
    });
    const { rtl, tags, small } = props;
    const classes = useStyles();
    const direction = rtl ? "row-reverse" : "row";
    return projectIsEditable ? (
        <TagEditContainer project={props.project} />
    ) : (
        <Grid container spacing={1} alignItems="flex-end" direction={direction}>
            {tags &&
                tags.map((tag) => {
                    return (
                        <Grid item key={tag}>
                            <Chip
                                label={tag}
                                component={Link}
                                to={`/tags/${tag}`}
                                clickable
                                size={small ? "small" : "medium"}
                                color={"secondary"}
                                icon={<LabelIcon />}
                                variant={"outlined"}
                            />
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default TagsComponent;
