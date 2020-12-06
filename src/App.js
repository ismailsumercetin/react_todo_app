import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import Task from "./Task";

//database util file
import dbUtil from "./db_util";

//css
import "./App.css";

import SnackbarComponent from "./SnackbarComponent";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    marginRight: "12px",
  },
}));

export default function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [handleSnackbar, setHandleSnackbar] = useState({
    messageText: "",
    isActive: false,
  });

  useEffect(() => {
    //important -> passing state
    dbUtil.getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    //important -> passing state
    dbUtil.getTasksByUserId(setTasks, inputUser);
  }, [inputUser]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setHandleSnackbar({ messageText: "", isActive: false });
  };

  function getSelectedUsername() {
    const name = document.querySelector("#demo-simple-select");
    return name.textContent;
  }

  const handleSnackbarDelete = () => {
    setHandleSnackbar({
      messageText: "Task has been deleted successfully!",
      isActive: true,
    });
  };

  const populateTasks = () => {
    const allTasks = tasks.map((task) => (
      <Task
        handleSnackbarDelete={handleSnackbarDelete}
        selectedUser={getSelectedUsername()}
        task={task}
      />
    ));
    return allTasks;
  };

  const populateUsers = () => {
    const allUsers = users.map((user) => (
      <MenuItem value={user.id}>{user.name}</MenuItem>
    ));
    return allUsers;
  };

  return (
    <div className="App">
      <h1>Todo app</h1>
      <form>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Users</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputUser}
            onChange={(event) => setInputUser(event.target.value)}
          >
            {populateUsers()}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          id="addTaskButton"
          disabled={!input.trim() || !inputUser}
          type="submit"
          onClick={() =>
            dbUtil.addTask(input, inputUser, setInput, setHandleSnackbar)
          }
          variant="contained"
          color="primary"
        >
          Add Task
        </Button>
      </form>
      <Grid
        id="appGrid"
        container
        direction="column"
        alignItems="center"
        spacing={3}
      >
        {populateTasks()}
      </Grid>
      <SnackbarComponent
        snackbarProp={handleSnackbar}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}
