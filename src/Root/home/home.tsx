import React from 'react'
import quarry from "../../assets/jpeg/quarry.jpeg"
import { Grid, Typography, makeStyles, Theme, createStyles, Paper, Container } from '@material-ui/core';
import { minHeight } from '@material-ui/system';

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
        flexDirection: "column-reverse",
        color: theme.palette.common.white
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
        padding: theme.spacing(2)
    }
}))

export default function MainContainer() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            {<img style={{ display: "none" }} src={quarry} />}
            <div className={classes.overlay} />
            <Grid className={classes.overlayText} container direction="column" >
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
        </Paper>
    )
}
