import React from 'react'
import { Button } from "@material-ui/core"
import TopBar from "./navigation/topBar/topBar";
import MainNavDrawer from "./navigation/drawer/mainNavDrawer"
import Home from './home/home';

export default function Root() {
    return (
        <React.Fragment>
            <TopBar />
            <MainNavDrawer />
            <Home />
        </React.Fragment>
    )
}
