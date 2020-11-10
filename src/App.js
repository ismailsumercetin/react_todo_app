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

//firebase and its config file
import db from "./firebase";
import firebase from "firebase";

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
  const [handleSnackbar, setHandleSnackbar] = useState(false);

  useEffect(() => {
    //useEffect remembers what's inside
    //When there is a snapshot (when there's a change in db), fire this again
    try {
      db.collection("users").onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
        );
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    //useEffect remembers what's inside
    //When there is a snapshot (when there's a change in db), fire this again
    //.orderBy('timestamp', 'desc') index error

    try {
      db.collection("tasks")
        .orderBy("timestamp", "desc")
        .where("ownerId", "==", inputUser)
        .onSnapshot((snapshot) => {
          setTasks(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              task: doc.data().task,
              timestamp: doc.data().timestamp,
              isCompleted: doc.data().isCompleted,
              taskColor: doc.data().taskColor,
            }))
          );
        });
    } catch (error) {
      alert(error);
    }
  }, [inputUser]);

  const addTask = (event) => {
    event.preventDefault();

    try {
      db.collection("tasks").add({
        task: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), //timestamp of the server
        ownerId: inputUser,
        isCompleted: false,
        taskColor: "#ffffff",
      });
      setInput("");
      setHandleSnackbar(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setHandleSnackbar(false);
  };

  function getSelectedUsername() {
    const name = document.querySelector("#demo-simple-select");
    return name.textContent;
  }

  const populateTasks = () => {
    return tasks.map((task) => (
      <Task selectedUser={getSelectedUsername()} task={task} />
    ));
  };

  const populateUsers = () => {
    return users.map((user) => (
      <MenuItem value={user.id}>{user.name}</MenuItem>
    ));
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
          onClick={addTask}
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
        isActivated={handleSnackbar}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}
