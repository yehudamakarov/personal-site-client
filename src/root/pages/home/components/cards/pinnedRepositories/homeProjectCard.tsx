import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles,
    Grid,
    Grow,
    Hidden,
    LinearProgress,
    makeStyles,
    Slide,
    Theme,
    Typography,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { IPinnedRepository } from "../../../../../../store/actions/pinnedRepositories/api";
import { GithubIcon } from "../../../../../iconButtons/icons/githubIcon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
        card: {
            display: "flex",
        },
        cardFace: {
            flex: 1,
        },
        cardSideButton: {
            [theme.breakpoints.down("xs")]: {
                width: theme.spacing(6),
            },
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: theme.spacing(14),
        },
        cardSideButtonHover: {
            "& svg": {
                fill: theme.palette.primary.dark,
            },
            backgroundColor: theme.palette.action.selected,
        },
        dummyTop: {
            [theme.breakpoints.up("sm")]: { minHeight: theme.spacing(4) },
        },
        iconRight: {
            marginLeft: theme.spacing(1),
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
    const setPressedTrue = () => setPressed(true);
    return (
        <div>
            <Card elevation={hovered ? 6 : 1} square className={classes.card}>
                <CardActionArea
                    component={Link}
                    to={`/projects/${project.name}`}
                    onMouseEnter={setHoveredTrue}
                    onMouseLeave={setHoveredFalse}
                    className={
                        hovered
                            ? classes.cardSideButton +
                              " " +
                              classes.cardSideButtonHover
                            : classes.cardSideButton
                    }
                >
                    <div className={classes.dummyTop} />
                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                    <div>
                        <Hidden xsDown>
                            <Grow in={hovered} timeout={500}>
                                <Typography variant="button">
                                    See More
                                </Typography>
                            </Grow>
                        </Hidden>
                    </div>
                </CardActionArea>
                <div className={classes.cardFace}>
                    <CardContent>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography variant="body2">
                            {project.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    onClick={setPressedTrue}
                                    size="small"
                                    color="primary"
                                    href={project.url}
                                >
                                    Github
                                    <GithubIcon className={classes.iconRight} />
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </div>
            </Card>
            <Grow in={pressed}>
                <LinearProgress variant="query" />
            </Grow>
        </div>
    );
};

export default HomeProjectCard;
