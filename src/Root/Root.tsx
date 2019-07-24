import React from 'react'
import { Button } from "@material-ui/core"
import TopBar from "./navigation/topBar/topBar";
import MainNavDrawer from "./navigation/drawer/mainNavDrawer"

export default function Root() {
    return (
        <React.Fragment>
            <TopBar />
            <MainNavDrawer />
        </React.Fragment>
    )
}
