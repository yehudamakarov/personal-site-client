import React from 'react'
import { MyIconButtonBase } from '../base/myIconButtonBase';
import { ApiIcon } from '../icons/apiIcon';

export const ApiIconButton = React.forwardRef((props, ref: React.Ref<HTMLButtonElement>) => {
    return (
        <MyIconButtonBase {...props} ref={ref} >
            <ApiIcon />
        </MyIconButtonBase>
    )
})

