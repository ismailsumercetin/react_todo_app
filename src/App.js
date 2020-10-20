import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, Grid } from '@material-ui/core';
import Task from './Task'
import db from './firebase';
import firebase from 'firebase';
import './App.css';
import SnackbarComponent from './SnackbarComponent'

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [handleSnackbar, setHandleSnackbar] = useState(false);

  useEffect(() => {
    //useEffect remembers what's inside
    //When there is a snapshot (when there's a change in db), fire this again
    db.collection('tasks').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => ({id: doc.id, task: doc.data().task, timestamp: doc.data().timestamp})))
    });
  }, []);

  const addTask = (event) => {
    event.preventDefault();
    
    try {

      db.collection('tasks').add({
        task: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() //timestamp of the server
      })
      setInput('');
      setHandleSnackbar(true);

    } catch (error) {
      alert(error);
    }
    
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setHandleSnackbar(false);
  };

  return (
    <div className="App">
      <h1>Todo app</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button id="addTaskButton" disabled={!input.trim()} type="submit" onClick={addTask} variant="contained" color="primary">
          Add Task
        </Button>
        <Grid id="appGrid" container direction="column" alignItems="center" spacing={3}>
            {tasks.map(task => (
              <Task task={task}/>
            ))}
        </Grid>
        <SnackbarComponent isActivated={handleSnackbar} handleClose={handleSnackbarClose} />
      </form>
    </div>
  );
}