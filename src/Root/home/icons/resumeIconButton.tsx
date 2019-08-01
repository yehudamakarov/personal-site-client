import React from 'react'
import { SvgIcon, makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
import { MyIconButtonBase } from "./base/myIconButtonBase"

export const ResumeButton = React.forwardRef((props: any, ref: React.Ref<HTMLButtonElement>) => {
    return (
        <MyIconButtonBase {...props} ref={ref} edge="end">
            <SvgIcon viewBox='0 0 297 297'>
                <g>
                    <path d="m97.674,94.493c0.059-0.02 5.637-1.733 5.637-1.733 4.007-1.23 8.275,0.894 9.71,4.832l7.635,20.95 7.635-20.951c1.437-3.938 5.712-6.06 9.71-4.831 0,0 5.578,1.713 5.637,1.733 8.314,2.77 14.229,9.913 15.549,18.37v-62.103c0-3.181-2.579-5.76-5.76-5.76h-65.542c-3.181,0-5.76,2.579-5.76,5.76v62.103c1.32-8.457 7.235-15.599 15.549-18.37zm22.982-41.126c10.235,0 18.563,8.327 18.563,18.563 0,10.235-8.327,18.563-18.563,18.563s-18.563-8.327-18.563-18.563c0.001-10.236 8.328-18.563 18.563-18.563z" />
                    <path d="m140.425,110.297l-8.516,23.367h11.81v-17.209c-2.84217e-14-2.52-1.269-4.81-3.294-6.158z" />
                    <path d="m97.594,116.455v17.209h11.81l-8.516-23.367c-2.025,1.348-3.294,3.638-3.294,6.158z" />
                    <path d="m249.375,0h-201.75c-5.799,0-10.5,4.701-10.5,10.5v276c0,5.799 4.701,10.5 10.5,10.5h201.75c5.799,0 10.5-4.701 10.5-10.5v-276c0-5.799-4.701-10.5-10.5-10.5zm-183,37.125c0-4.349 3.526-7.875 7.875-7.875h92.812c4.35,0 7.875,3.526 7.875,7.875v104.414c0,4.349-3.525,7.875-7.875,7.875h-92.812c-4.349,0-7.875-3.526-7.875-7.875v-104.414zm156.375,212.063h-148.5c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h148.5c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875zm0-55.688h-148.5c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h148.5c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875zm0-74.25h-18.563c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h18.563c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875zm0-37.125h-18.563c-4.349,0-7.875-3.526-7.875-7.875s3.526-7.875 7.875-7.875h18.563c4.349,0 7.875,3.526 7.875,7.875s-3.526,7.875-7.875,7.875z" />
                </g>
            </SvgIcon>
        </MyIconButtonBase>
    )
})
