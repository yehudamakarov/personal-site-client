import { Card, CardActionArea, CardContent, CardMedia, Grow, Theme, Typography } from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Link } from "@reach/router";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: "flex",
        },
        cardButton: {
            "& svg": { fill: theme.palette.secondary.contrastText },
            "&:hover": {
                "& svg": { fill: theme.palette.secondary.contrastText },
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.secondary.contrastText,
            },
            [theme.breakpoints.down("xs")]: {
                width: theme.spacing(10),
            },
            alignItems: "center",
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // color: theme.palette.getContrastText(theme.palette.secondary.main),
            width: theme.spacing(16),
        },
        cardFace: {
            flex: 1,
        },
        dummyTop: {
            minHeight: theme.spacing(4),
        },
    })
);

interface IOwnProps {
    children: any;
    to: string;
}

export const HomepageCard = (props: IOwnProps) => {
    const classes = useStyles();
    const [hovered, setHovered] = useState(false);
    const { children, to } = props;

    const setHovering = (hovering: boolean) => () => setHovered(hovering);

    return (
        <Card square elevation={hovered ? 1 : 4} className={classes.card}>
            <div className={classes.cardFace}>
                <CardContent>{children}</CardContent>
            </div>
            <CardActionArea
                onMouseEnter={setHovering(true)}
                onMouseLeave={setHovering(false)}
                component={Link}
                to={to}
                className={classes.cardButton}
            >
                <div className={classes.dummyTop} />
                <CardMedia>
                    <ArrowForwardIosIcon />
                </CardMedia>
                <div>
                    <Grow in={hovered} timeout={400}>
                        <Typography variant="button">More</Typography>
                    </Grow>
                </div>
            </CardActionArea>
        </Card>
    );
};
