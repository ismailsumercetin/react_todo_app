import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarComponent(props) {

    const anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'right'
    }
    
    return (
        <div>
            <Snackbar open={props.isActivated} autoHideDuration={3000} onClose={props.handleClose} anchorOrigin={anchorOrigin}>
                <Alert onClose={props.handleClose} severity="success">
                    Task has been added successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}