import React from 'react'
import { HomepageHero } from './components/homePageHero';
import { HomepageBody } from "./components/homepageBody"

export const Homepage = (props: { path: string }) => {
    return (
        <React.Fragment>
            <HomepageHero />
            <HomepageBody />
        </React.Fragment>
    )
}
