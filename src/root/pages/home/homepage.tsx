import { RouteComponentProps } from "@reach/router";
import React from "react";
import { HomepageBody } from "./components/homepageBody";
import { HomepageHero } from "./components/homePageHero";

type OwnProps = RouteComponentProps;

export const Homepage = (props: OwnProps) => {
    return (
        <React.Fragment>
            {/* Everything on the picture */}
            <HomepageHero />
            {/* Everything below the picture */}
            <HomepageBody />
        </React.Fragment>
    );
};
