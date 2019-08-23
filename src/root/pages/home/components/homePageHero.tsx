import React from 'react'
import quarry from "../../../../assets/jpeg/quarry.jpeg"
import { Grid, Typography, makeStyles, Theme, createStyles, Paper, Container, Tooltip, Link, Snackbar, Button, Slide, Grow, Fade, CircularProgress } from '@material-ui/core';
import { LinkedInIconButton } from "../../../iconButtons/buttons/linkedInIconButton"
import { GithubIconButton } from "../../../iconButtons/buttons/githubIconButton"
import { ResumeButton } from "../../../iconButtons/buttons/resumeIconButton"
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { HeroTextContainer } from './heroTextContainer';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: "relative"
    },
    container: {
        [theme.breakpoints.down("sm")]: {
            paddingRight: 0,
            paddingLeft: 0
        }
    },
    paper: {
        backgroundImage: `url(${quarry})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        height: "60vh",
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: "left"
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4)
    },
    overlayEverything: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        color: theme.palette.common.white,
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.secondary.dark})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    progress: {
    }
}))


export const HomepageHero = () => {
    const classes = useStyles();
    const [heroLoaded, setHeroLoaded] = React.useState(false);

    const handleHeroLoaded = () => {
        setHeroLoaded(true);
    }
    return (
        <div className={classes.root}>
            {<img onLoad={handleHeroLoaded} style={{ display: "none" }} src={quarry} />}
            <Fade in={!heroLoaded}>
                <Paper className={classes.overlayEverything}>
                    <div className={classes.loadingOverlay}>
                        <CircularProgress size={72} thickness={4.2} color={"secondary"} className={classes.progress} />
                    </div>
                    <HeroTextContainer />
                </Paper>
            </Fade>
            <Fade in={heroLoaded}>
                <Paper className={classes.paper}>
                    <div className={classes.overlay} />
                    <HeroTextContainer />
                </Paper>
            </Fade>
        </div>
    )
}
