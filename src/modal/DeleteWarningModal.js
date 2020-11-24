import React from "react";
import { Button, Modal } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

//database util file
import dbUtil from "../db_util";

function DeleteWarningModal({
  useStyles,
  open,
  handleModalClose,
  handleSnackbarDelete,
  taskId,
}) {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={() => handleModalClose()}>
      <div className={classes.paper}>
        <p className={classes.warningIcon}>
          <WarningIcon fontSize="large" />
        </p>
        <p className={classes.warningImage}>
          Are you sure you want to delete this task?
        </p>
        <hr />
        <form className={classes.form}>
          <Button
            className={classes.deleteButton}
            variant="contained"
            color="secondary"
            onClick={() =>
              dbUtil.deleteTask(taskId, handleSnackbarDelete, handleModalClose)
            }
          >
            Delete
          </Button>
          <Button variant="contained" onClick={() => handleModalClose()}>
            Cancel
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default DeleteWarningModal;
