import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
import { ResumeIcon } from "../icons/resumeIcon"
import { MyIconButtonBase } from "../base/myIconButtonBase"

export const ResumeButton = React.forwardRef((props: any, ref: React.Ref<HTMLButtonElement>) => {
    return (
        <MyIconButtonBase {...props} ref={ref} edge="end">
            <ResumeIcon />
        </MyIconButtonBase>
    )
})
