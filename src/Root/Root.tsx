import React from 'react'
import { Button, Typography } from "@material-ui/core"
import TopBar from "./navigation/topBar/topBar";
import MainNavDrawer from "./navigation/drawer/mainNavDrawer"
import MainContainer from './home/home';
import Navigation from './navigation/navigation';

export default function Root() {
    return (
        <React.Fragment>
            <Navigation />
            <MainContainer />
        </React.Fragment>
    )
}
