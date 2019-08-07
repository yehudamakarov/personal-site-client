import React from 'react'
import quarry from "../../assets/jpeg/quarry.jpeg"
import { Grid, Typography, makeStyles, Theme, createStyles, Paper, Container, Tooltip, Link, Snackbar, Button, Slide, Grow, Fade } from '@material-ui/core';
import { LinkedInIconButton } from "./icons/linkedInIconButton"
import { GithubIconButton } from "./icons/githubIconButton"
import { ResumeButton } from "./icons/resumeIconButton"
import { TransitionProps } from '@material-ui/core/transitions/transition';

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
        height: "80vh",
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
        marginBottom: theme.spacing(4)
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    overlayText: {
        position: "relative",
        textAlign: "end",
        paddingBottom: theme.spacing(2)
    }
}))

const SlideTransition = (props: TransitionProps) => <Slide {...props} direction="right" timeout={200} />

export const HomepageHero = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [heroLoaded, setHeroLoaded] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }
    const hadnleHeroLoaded = () => {
        setHeroLoaded(true);
    }
    return (
        <div className={classes.root}>
            {<img onLoad={hadnleHeroLoaded} style={{ display: "none" }} src={quarry} />}
            <Fade in={!heroLoaded}>
                <Paper className={classes.overlayEverything}>
                    <div className={classes.overlay} />
                    <Container>
                        <Grid item container direction="column" alignItems="flex-end">
                            <Grid item>
                                <Link target="_blank" href={process.env.REACT_APP_LINKEDIN_HOMEPAGE_URL}>
                                    <Tooltip title="My LinkedIn Homepage" placement="left">
                                        <LinkedInIconButton />
                                    </Tooltip>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link target="_blank" href={process.env.REACT_APP_GITHUB_PROFILE_URL}>
                                    <Tooltip title="My Github Profile" placement="left">
                                        <GithubIconButton />
                                    </Tooltip>
                                </Link>
                            </Grid>
                            <Grid item>
                                {/* <Link target="_blank" href={process.env.REACT_APP_RESUME_URL}> */}
                                <Tooltip title="My Resume" placement="left">
                                    <ResumeButton onClick={handleClick} />
                                </Tooltip>
                                {/* </Link> */}
                            </Grid>
                        </Grid>
                        <Grid className={classes.overlayText} container direction="column" alignItems="flex-end" spacing={1} >
                            <Grid item >
                                <Typography variant="h3">
                                    Full Stack Engineer
                            </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography variant="subtitle1" >
                                    My name is Yehuda Makarov, and I make software that is fun to maintain and pleasant to use.
                            </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Fade>
            <Grow in={heroLoaded}>
                <Paper className={classes.paper}>
                    <div className={classes.overlay} />
                    <Container>
                        <Grid item container direction="column" alignItems="flex-end">
                            <Grid item>
                                <Link target="_blank" href={process.env.REACT_APP_LINKEDIN_HOMEPAGE_URL}>
                                    <Tooltip title="My LinkedIn Homepage" placement="left">
                                        <LinkedInIconButton />
                                    </Tooltip>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link target="_blank" href={process.env.REACT_APP_GITHUB_PROFILE_URL}>
                                    <Tooltip title="My Github Profile" placement="left">
                                        <GithubIconButton />
                                    </Tooltip>
                                </Link>
                            </Grid>
                            <Grid item>
                                {/* <Link target="_blank" href={process.env.REACT_APP_RESUME_URL}> */}
                                <Tooltip title="My Resume" placement="left">
                                    <ResumeButton onClick={handleClick} />
                                </Tooltip>
                                {/* </Link> */}
                            </Grid>
                        </Grid>
                        <Grid className={classes.overlayText} container direction="column" alignItems="flex-end" spacing={1} >
                            <Grid item >
                                <Typography variant="h3">
                                    Full Stack Engineer
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography variant="subtitle1" >
                                    My name is Yehuda Makarov, and I make software that is fun to maintain and pleasant to use.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Snackbar
                        TransitionComponent={SlideTransition}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={open}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        message={<span>The resume will be up soon.</span>}
                        action={[
                            <Button
                                key="got-it"
                                onClick={handleClose}
                                size="small"
                                variant="contained"
                                color="secondary"
                            >
                                Got it.
                            </Button>
                        ]} />
                </Paper>
            </Grow>
        </div>
    )
}
