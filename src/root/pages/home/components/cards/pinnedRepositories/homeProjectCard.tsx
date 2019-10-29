import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    createStyles,
    Grid,
    Grow,
    Hidden,
    LinearProgress,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import SubjectIcon from "@material-ui/icons/Subject";
import { Link, navigate } from "@reach/router";
import React, { useState } from "react";
import { IPinnedRepository } from "../../../../../../store/actions/pinnedRepositories/api";
import { GithubIcon } from "../../../../../iconButtons/icons/githubIcon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardLeftPadding: {
            borderLeft: `${theme.spacing(1)}px ridge ${
                theme.palette.secondary.main
            }`,
            borderRadius: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
        cardSideButtonHover: {
            backgroundColor: theme.palette.action.selected,
        },
    })
);

interface IOwnProps {
    project: IPinnedRepository;
}

const HomeProjectCard = (props: IOwnProps) => {
    const classes = useStyles();
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const { project } = props;
    const setHoveredTrue = () => setHovered(true);
    const setHoveredFalse = () => setHovered(false);
    const setPressedTrue = async (event: any) => {
        event.preventDefault();
        setPressed(true);
        await navigate(project.url);
    };
    const CardBody = (
        <div>
            <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2">{project.description}</Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button
                            onClick={setPressedTrue}
                            size="small"
                            color="primary"
                            disableTouchRipple
                            endIcon={<GithubIcon />}
                        >
                            View Source
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            endIcon={<SubjectIcon />}
                            size="small"
                            color="primary"
                            disableTouchRipple
                        >
                            See More
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </div>
    );
    return (
        <div>
            <CardActionArea
                component={Link}
                to={`/projects/${project.name}`}
                onMouseEnter={setHoveredTrue}
                onMouseLeave={setHoveredFalse}
                className={hovered ? classes.cardSideButtonHover : ""}
            >
                <Hidden xsDown>
                    <Card elevation={0} square>
                        {CardBody}
                    </Card>
                </Hidden>
                <Hidden smUp>
                    <div className={classes.cardLeftPadding}>
                        <Card elevation={0} square>
                            {CardBody}
                        </Card>
                    </div>
                </Hidden>
            </CardActionArea>

            <Grow in={pressed}>
                <LinearProgress variant="query" />
            </Grow>
        </div>
    );
};

export default HomeProjectCard;
