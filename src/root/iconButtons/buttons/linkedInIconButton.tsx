import {
    createStyles,
    IconButton,
    makeStyles,
    SvgIcon,
    Theme,
    Tooltip,
} from "@material-ui/core";
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
