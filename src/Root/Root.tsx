import React from 'react'
import { Button } from "@material-ui/core"
import TopBar from "./TopBar/TopBar";
import MainNavDrawer from "./MainNavDrawer/MainNavDrawer"

export default function Root() {
    return (
        <React.Fragment>
            <TopBar />
            <MainNavDrawer />
        </React.Fragment>
    )
}
