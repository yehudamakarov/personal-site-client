import React from 'react'
import { Button, Typography } from "@material-ui/core"
import { TopBar } from "./navigation/topBar/topBar";
import { MainNavDrawer } from "./navigation/drawer/mainNavDrawer"
import { Navigation } from './navigation/navigation';
import { Homepage } from './home/homepage';

export const Root = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Homepage />
        </React.Fragment>
    )
}
