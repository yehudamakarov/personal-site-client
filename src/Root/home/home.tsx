import React from 'react'
import stairwell from "../../assets/jpeg/stairwell.jpeg"
import { Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
    image: {
        backgroundImage: `url(${stairwell})`,
        height: '80vh',
        marginTop: theme.spacing(2),
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }
}))

export default function Home() {
    const classes = useStyles();
    return (
        <Grid container justify="center">
            <Grid item xs={11} >
                <div className={classes.image}></div>
            </Grid>
        </Grid>
    )
}
