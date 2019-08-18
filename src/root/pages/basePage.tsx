import React from 'react'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(4)
    }
}))

export const BasePage = (props: any) => {
    const { children } = props;

    const classes = useStyles();
    return (
        <Container className={classes.container}>
            {children}
        </Container>
    )
}

