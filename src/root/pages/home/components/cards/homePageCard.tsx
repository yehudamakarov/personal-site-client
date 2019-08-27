import React, { useState } from 'react'
import { Card, CardContent, Typography, CardActionArea, CardMedia, Theme, Tooltip, Grow } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from '@reach/router';


const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        display: "flex"
    },
    cardFace: {
        flex: 1
    },
    cardButton: {
        [theme.breakpoints.down("xs")]: {
            width: theme.spacing(10),
        },
        width: theme.spacing(16),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.secondary.main,
        // color: theme.palette.getContrastText(theme.palette.secondary.main),
        '& svg': { fill: theme.palette.secondary.contrastText },
        '&:hover': {
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.dark,
            '& svg': { fill: theme.palette.secondary.contrastText },
        }
    },
    dummyTop: {
        minHeight: theme.spacing(4)
    }
}))

type OwnProps = { children: any, to: string }

export const HomepageCard = (props: OwnProps) => {
    const classes = useStyles();
    const [hovered, setHovered] = useState(false)
    const { children, to } = props;
    return (
        <Card square elevation={hovered ? 1 : 4} className={classes.card}>
            <div className={classes.cardFace}>
                <CardContent>
                    {children}
                </CardContent>
            </div>
            <CardActionArea
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
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
                        <Typography variant="button">
                            More
                        </Typography>
                    </Grow>
                </div>
            </CardActionArea>
        </Card>
    )
}
