import React, { useState } from "react";
import {
  Button,
  ListItemText,
  Modal,
  Grid,
  Paper,
  Input,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColorPicker from "material-ui-color-picker";

//icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

//database util file
import dbUtil from "./db_util";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "30%",
    left: "50%",
    transform: "translate(-50%, 0)",
    top: "25%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  gridPaper: {
    padding: theme.spacing(2),
    textAlign: "left",
  },
  icons: {
    margin: "15px 0 0 35px",
    cursor: "pointer",
  },
  updateButton: {
    marginLeft: "15px",
  },
  headerContainer: {
    marginBottom: "15px",
  },
  header_2: {
    display: "inline",
  },
  header_5: {
    display: "inline",
    fontWeight: "normal",
    marginLeft: "12px",
    color: "gray",
    fontStyle: "italic",
  },
  colorPicker: {
    marginLeft: "15px",
  },
}));

export default function Task({ task, selectedUser, handleSnackbarDelete }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const convertDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000).toLocaleString();
      return date;
    }
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <div className={classes.headerContainer}>
            <h2 className={classes.header_2}>{task.task}</h2>
            <h5 className={classes.header_5}>by {selectedUser}</h5>
          </div>
          <form>
            <Input
              placeholder={task.task}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              type="submit"
              className={classes.updateButton}
              variant="contained"
              color="primary"
              disabled={!input.trim() || !input}
              onClick={() => dbUtil.updateTask(task.id, input, setOpen)}
            >
              Update Task
            </Button>
          </form>
        </div>
      </Modal>
      <Grid item>
        <Paper
          className={classes.gridPaper}
          style={{ backgroundColor: task.taskColor }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <ListItemText
                primary={
                  <Typography
                    type="body2"
                    style={{
                      textDecoration: task.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.task}
                  </Typography>
                }
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
              <EditIcon onClick={(e) => setOpen(true)} />
              <DeleteForeverIcon
                onClick={() => dbUtil.deleteTask(task.id, handleSnackbarDelete)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
