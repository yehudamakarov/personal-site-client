import React from "react";
import { MyIconButtonBase } from "../base/myIconButtonBase";
import { LinkedInIcon } from "../icons/linkedInIcon";

export const LinkedInIconButton = React.forwardRef(
    (props, ref: React.Ref<HTMLButtonElement>) => {
        return (
            <MyIconButtonBase {...props} ref={ref} edge="end">
                <LinkedInIcon />
            </MyIconButtonBase>
        );
    }
);
