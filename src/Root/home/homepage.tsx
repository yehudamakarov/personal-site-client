import React from 'react'
import { HomepageHero } from './homePageHero';
import { HomepageBody } from "./homepageBody"

export const Homepage = () => {
    return (
        <React.Fragment>
            <HomepageHero />
            <HomepageBody />
        </React.Fragment>
    )
}
