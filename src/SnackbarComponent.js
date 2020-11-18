import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarComponent({ snackbarProp, handleClose }) {
  const anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  };

  return (
    <div>
      <Snackbar
        open={snackbarProp.isActive}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert onClose={handleClose} severity="success">
          {snackbarProp.messageText}
        </Alert>
      </Snackbar>
    </div>
  );
}
