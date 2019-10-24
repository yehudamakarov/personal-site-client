import { CircularProgress, createStyles, Fade, makeStyles, Paper, Theme } from "@material-ui/core";
import React from "react";
import quarry from "../../../../assets/jpeg/quarry.jpeg";
import { HeroTextContainer } from "./heroTextContainer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down("sm")]: {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
        loadingOverlay: {
            alignItems: "center",
            backgroundImage: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.secondary.dark})`,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
        },
        overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            bottom: 0,
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
        },
        overlayEverything: {
            bottom: 0,
            color: theme.palette.common.white,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
        },
        paper: {
            backgroundImage: `url(${quarry})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: theme.palette.common.white,
            display: "flex",
            [theme.breakpoints.down("sm")]: {
                backgroundPosition: "left",
            },
            flexDirection: "column",
            height: "60vh",
            justifyContent: "flex-end",
            marginBottom: theme.spacing(4),
            position: "relative",
        },
        root: {
            position: "relative",
        },
    })
);

export const HomepageHero = () => {
    const classes = useStyles();
    const [heroLoaded, setHeroLoaded] = React.useState(false);

    const handleHeroLoaded = () => {
        setHeroLoaded(true);
    };
    return (
        <div className={classes.root}>
            {
                <img
                    onLoad={handleHeroLoaded}
                    style={{ display: "none" }}
                    src={quarry}
                    alt="quarry"
                />
            }
            <Fade in={!heroLoaded}>
                <Paper className={classes.overlayEverything}>
                    <div className={classes.loadingOverlay}>
                        <CircularProgress
                            size={72}
                            thickness={4.2}
                            color={"secondary"}
                        />
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
    );
};
