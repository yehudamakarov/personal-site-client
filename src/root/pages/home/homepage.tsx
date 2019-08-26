import React from 'react'
import { HomepageHero } from './components/homePageHero';
import { HomepageBody } from "./components/homepageBody"
import { RouteComponentProps } from '@reach/router';

type OwnProps = RouteComponentProps

export const Homepage = (props: OwnProps) => {
    return (
        <React.Fragment>
            {/* Everything on the picture */}
            <HomepageHero />
            {/* Everything below the picture */}
            <HomepageBody />
        </React.Fragment>
    )
}
