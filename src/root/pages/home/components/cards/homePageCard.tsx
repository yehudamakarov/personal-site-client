import React from 'react'
import { Card, CardContent, Typography, CardActionArea, CardMedia, Theme, Tooltip } from '@material-ui/core';
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.secondary.main,
        '& svg': { fill: theme.palette.common.white },
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
}))

type OwnProps = { children: any, to: string }

export const HomepageCard = (props: OwnProps) => {
    const classes = useStyles();
    const { children, to } = props;
    return (
        <Card className={classes.card}>
            <div className={classes.cardFace}>
                <CardContent>
                    {children}
                </CardContent>
            </div>
            <Tooltip title="More" placement="left">
                <CardActionArea component={Link} to={to} className={classes.cardButton}>
                    <CardMedia>
                        <ArrowForwardIosIcon />
                    </CardMedia>
                </CardActionArea>
            </Tooltip>
        </Card>
    )
}
