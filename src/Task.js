import React, { useState } from "react";
import {
  ListItemText,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColorPicker from "material-ui-color-picker";

//icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//database util file
import dbUtil from "./db_util";

//modal
import DeleteWarningModal from "./modal/DeleteWarningModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "25%",
    left: "50%",
    transform: "translate(-50%, 0)",
    top: "25%",
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: "left",
  },
  icons: {
    margin: "15px 0 0 35px",
    cursor: "pointer",
  },
  deleteButton: {
    marginRight: "15px",
  },
  headerContainer: {
    marginBottom: "15px",
  },
  colorPicker: {
    marginLeft: "15px",
  },
  form: {
    textAlign: "center",
    marginTop: "15px",
  },
  warningIcon: {
    textAlign: "center",
  },
  warningImage: {
    textAlign: "center",
  },
  taskDiv: {
    width: "400px",
    maxWidth: "400px",
  },
}));

export default function Task({ task, handleSnackbarDelete }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const convertDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000).toLocaleString();
      return date;
    }
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const updateTask = (e) => {
    const updatedTask = e.target.textContent;

    if (updatedTask !== task.task) {
      dbUtil.updateTask(task.id, updatedTask);
    }
  };

  //onBlur fires immediately when it is in render, and clicking on checkbox?
  const listItemTextPrimary = () => {
    return (
      <div
        className={classes.taskDiv}
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
        contentEditable={!task.isCompleted}
        data-gramm_editor="false"
        onBlur={(e) => updateTask(e)}
      >
        {task.task}
      </div>
    );
  };

  return (
    <>
      <DeleteWarningModal
        useStyles={useStyles}
        open={open}
        handleModalClose={handleModalClose}
        handleSnackbarDelete={handleSnackbarDelete}
        taskId={task.id}
      />
      <Grid item>
        <Paper
          className={classes.gridPaper}
          style={{ backgroundColor: task.taskColor }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <ListItemText
                primary={listItemTextPrimary()}
                secondary={convertDate(task.timestamp)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.isCompleted}
                    onChange={() =>
                      dbUtil.handleTaskStatus(task.id, task.isCompleted)
                    }
                    name="checkedB"
                    color="primary"
                  />
                }
                label={task.isCompleted ? "Done!" : "Not Done"}
              />
              Task Color:
              <ColorPicker
                className={classes.colorPicker}
                name="color"
                defaultValue={task.taskColor}
                onChange={(color) =>
                  color ? dbUtil.updateColor(color, task.id) : ""
                }
              />
            </Grid>
            <Grid item className={classes.icons}>
              <DeleteForeverIcon onClick={() => setOpen(true)} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
