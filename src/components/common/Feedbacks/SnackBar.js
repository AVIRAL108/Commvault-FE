import { Snackbar } from '@mui/material'
import React from 'react'
import { Alert } from './Alert'

export default function SnackBar({ open, handleClose, message , severity, time}) {
    return (
        <div>
            <Snackbar anchorOrigin={{ 
                vertical : 'top',
                horizontal : 'center'

            }} open={open} autoHideDuration={time} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity } sx={{ width: '100%' }}>
                    { message }
                </Alert>
            </Snackbar>
        </div>
    )
}
