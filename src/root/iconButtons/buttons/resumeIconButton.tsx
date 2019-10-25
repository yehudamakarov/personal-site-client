import React from "react";
import { MyIconButtonBase } from "../base/myIconButtonBase";
import { ResumeIcon } from "../icons/resumeIcon";

export const ResumeButton = React.forwardRef(
    (props: any, ref: React.Ref<HTMLButtonElement>) => {
        return (
            <MyIconButtonBase {...props} ref={ref} edge="end">
                <ResumeIcon />
            </MyIconButtonBase>
        );
    }
);
