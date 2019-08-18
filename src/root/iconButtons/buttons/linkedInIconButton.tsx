import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton, Tooltip } from '@material-ui/core';
import { LinkedInIcon } from "../icons/linkedInIcon"
import { MyIconButtonBase } from "../base/myIconButtonBase"
export const LinkedInIconButton = React.forwardRef((props, ref: React.Ref<HTMLButtonElement>) => {
    return (
        <MyIconButtonBase {...props} ref={ref} edge="end" >
            <LinkedInIcon />
        </MyIconButtonBase>
    )
})
