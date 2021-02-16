import React, { useState, useEffect, useMemo } from "react";

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
} from "./style/styleApp";

const App = ({ handleIsSignedOut }) => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    dbUtil.getCurrentUserTasks(setTasks);
  }, []);

  const populateTasks = useMemo(() => {
    const allTasks = tasks.map((task) => <Task key={task.id} task={task} />);

    if(!allTasks.length)
      return "No tasks to show";
    
    return allTasks;
  }, [tasks]);

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
      <TaskWrapper>{populateTasks}</TaskWrapper>
    </div>
  );
};

export default App;