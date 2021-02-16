import React, { useState, useEffect } from "react";

//components
import Task from "./Task";

//db-auth util
import dbUtil from "./db_util";
import { logoutUser, getCurrentUser } from "./auth_util";

//style
import {
  AppWrapper,
  TaskInput,
  AddTaskButton,
  TaskWrapper,
  FilterBar
} from "./style/styleApp";

const App = ({ handleIsSignedOut }) => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filterDone, setFilterDone] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dbUtil.getCurrentUserTasks(setTasks);
  }, []);

  const populateTasks = () => {
    //filtering completed tasks
    let allTasks = filterDone ? tasks.filter(task => task.isCompleted) : tasks;

    //filtering given text input
    allTasks = filterInput.length ? allTasks.filter(task => task.task.includes(filterInput)) : allTasks;
    
    allTasks = allTasks.map((task) => {
      return <Task key={task.id} task={task} />
    });
    
    //if there's nothing to show, even after filtering
    if(!allTasks.length)
      return "No tasks to show";
    
    return allTasks;
  };

  return (
    <div>
      <AppWrapper>
        <button type="submit" onClick={() => logoutUser(handleIsSignedOut)}>
          Sign Out
        </button>
        <h1>Todo app</h1>
        <form>
          <TaskInput
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <AddTaskButton
            id="addTaskButton"
            disabled={!input.trim()}
            type="submit"
            onClick={() => dbUtil.addTask(input, getCurrentUser().uid, setInput)}
          >
            Add Task
          </AddTaskButton>
        </form>
      </AppWrapper>
      <TaskWrapper>{populateTasks()}</TaskWrapper>
      <FilterBar>
      <label htmlFor="cb_filterDone">
        <input id="cb_filterDone" type="checkbox"
          onChange={() => setFilterDone(!filterDone)}
        />
        Completed Tasks</label>

        <label htmlFor="filterInput">Search Task
        <input id="filterInput" type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        </label>
      </FilterBar>
    </div>
  );
};

export default App;