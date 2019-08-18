import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
import { GithubIcon } from "../icons/githubIcon"
import { MyIconButtonBase } from "../base/myIconButtonBase"

export const GithubIconButton = React.forwardRef((props, ref: React.Ref<HTMLButtonElement>) => {
    return (
        <MyIconButtonBase ref={ref} {...props} edge="end">
            <GithubIcon />
        </MyIconButtonBase>
    )
})
