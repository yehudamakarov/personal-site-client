import React from 'react'
import MainNavDrawer from './drawer/mainNavDrawer';
import TopBar from './topBar/topBar';

export default function Navigation() {
    return (
        <React.Fragment>
            <TopBar />
            <MainNavDrawer />
        </React.Fragment>
    )
}
