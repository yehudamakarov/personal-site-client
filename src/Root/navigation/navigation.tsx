import React from 'react'
import { MainNavDrawer } from './drawer/mainNavDrawer';
import { TopBar } from './topBar/topBar';

export const Navigation = () => {
    return (
        <React.Fragment>
            <TopBar />
            <MainNavDrawer />
        </React.Fragment>
    )
}
