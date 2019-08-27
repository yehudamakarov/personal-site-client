import React, { useState } from 'react'
import { Project } from '../../../../../../store/reducers/projects/projectsReducer';
import { Card, CardContent, CardActions, Button, Typography, CardActionArea, makeStyles, createStyles, Theme, Grid, CardMedia, Grow, Slide, Avatar, LinearProgress, Hidden } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { GithubIcon } from '../../../../../iconButtons/icons/githubIcon';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        display: "flex"
    },
    cardFace: {
        flex: 1
    },
    cardSideButton: {
        [theme.breakpoints.down("xs")]: {
            width: theme.spacing(6),
        },
        width: theme.spacing(14),
        // backgroundColor: theme.palette.action.hover,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",

    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    },
    cardSideButtonHover: {
        "& svg": {
            fill: theme.palette.primary.dark
        },
        backgroundColor: theme.palette.action.selected
    },
    dummyTop: {
        [theme.breakpoints.up("sm")]: { minHeight: theme.spacing(4) }
    },
}))

type OwnProps = {
    project: Project
}

const HomeProjectCard = (props: OwnProps) => {
    const classes = useStyles();
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const { project } = props;
    return (
        <div>
            <Card elevation={hovered ? 1 : 0} square className={classes.card}>
                <CardActionArea component={Link} to={`/projects/${project.name}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={hovered ? classes.cardSideButton + " " + classes.cardSideButtonHover : classes.cardSideButton}>
                    <div className={classes.dummyTop} />
                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                    <div>
                        <Hidden xsDown>
                            <Grow in={hovered} timeout={500} >
                                <Typography variant="button">See More</Typography>
                            </Grow>
                        </Hidden>
                    </div>
                </CardActionArea>
                <div className={classes.cardFace}>
                    <CardContent>
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography variant="body2">{project.description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button onClick={() => setPressed(true)} size="small" color="primary" href={project.url} >
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
    )
}

export default HomeProjectCard
