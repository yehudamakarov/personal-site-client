import React from "react";
import { MyIconButtonBase } from "../base/myIconButtonBase";
import { GithubIcon } from "../icons/githubIcon";

export const GithubIconButton = React.forwardRef(
    (props, ref: React.Ref<HTMLButtonElement>) => {
        return (
            <MyIconButtonBase ref={ref} {...props} edge="end">
                <GithubIcon />
            </MyIconButtonBase>
        );
    }
);
