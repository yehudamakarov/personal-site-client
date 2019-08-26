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
        width: theme.spacing(10),
        backgroundColor: theme.palette.action.hover,
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
        minHeight: theme.spacing(4)
    },
    loading: {
        [theme.breakpoints.up("sm")]: {
            minHeight: theme.spacing(5)
        }
    }
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
            <Card elevation={hovered ? 1 : 8} square className={classes.card}>
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
                <CardActionArea component={Link} to={`/projects/${project.name}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={hovered ? classes.cardSideButton + " " + classes.cardSideButtonHover : classes.cardSideButton}>
                    <Hidden xsDown>
                        <div className={classes.dummyTop} />
                    </Hidden>
                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                    <div>
                        <Hidden xsDown>
                            <Grow in={hovered}>
                                <Typography variant="button">See More</Typography>
                            </Grow>

                        </Hidden>
                    </div>
                </CardActionArea>
            </Card>
            {pressed && <LinearProgress variant="query" />}
        </div>
    )
}

export default HomeProjectCard
