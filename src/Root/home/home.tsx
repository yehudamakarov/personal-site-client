import React from 'react'
import quarry from "../../assets/jpeg/quarry.jpeg"
import { Grid, Typography, makeStyles, Theme, createStyles, Paper, Container, Tooltip } from '@material-ui/core';
import { LinkedInIconButton } from "./icons/linkedInIconButton"
import { GithubIconButton } from "./icons/githubIconButton"
import { ResumeButton } from "./icons/resumeIconButton"

const useStyles = makeStyles((theme: Theme) => createStyles({
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
        marginBottom: theme.spacing(8)
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
        paddingBottom: theme.spacing(4)
    },
}))

export default function MainContainer() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            {<img style={{ display: "none" }} src={quarry} />}
            <div className={classes.overlay} />
            <Container>
                <Grid item container direction="column" alignItems="flex-end">
                    <Grid item>
                        <Tooltip title="My LinkedIn Homepage" placement="left">
                            <LinkedInIconButton />
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="My Github Profile" placement="left">
                            <GithubIconButton />
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="My Resume" placement="left">
                            <ResumeButton />
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid className={classes.overlayText} container direction="column" alignItems="flex-end" >
                    <Grid item >
                        <Typography variant="h3">
                            Software Guy
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" >
                            Making good software for people to use.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}
