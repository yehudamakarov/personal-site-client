import { createStyles, Link, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "@reach/router";
import React from "react";
import { animated, useSpring } from "react-spring";
import { BrandIcon } from "../../iconButtons/icons/brandIcon";

const calc = (x: any, y: any) => [y, x, 1.01];
const trans = (x: any, y: any, s: any) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        brandIcon: {},
        iconPush: {
            flexGrow: 1,
        },
    })
);
export const BrandLogo = () => {
    const classes = useStyles();

    const [props, set] = useSpring(() => ({
        config: { mass: 5, tension: 350, friction: 40 },
        xys: [0, 0, 1] as any,
    }));

    const handleMouseMove = () => {
        const x: any = 0.1;
        const y: any = 0.1;
        set({ xys: calc(x, y) });
    };

    const handleMouseLeave = () => set({ xys: [0, 0, 1] });

    return (
        <Link
            color="inherit"
            component={RouterLink}
            to="/"
            variant="h6"
            className={classes.iconPush}
        >
            <div
                className={classes.brandIcon}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <animated.div
                    style={{
                        display: "flex",
                        transform: props.xys.interpolate(trans),
                    }}
                >
                    <BrandIcon />
                </animated.div>
            </div>
        </Link>
    );
};
