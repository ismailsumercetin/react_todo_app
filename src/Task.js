import React from "react";
import ColorPicker from "material-ui-color-picker";

//icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//database util file
import dbUtil from "./db_util";

export default function Task({ task }) {
  const convertDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000).toLocaleString();
      return date;
    }
  };

  const updateTask = (e) => {
    const updatedTask = e.target.textContent;

    if (updatedTask !== task.task) {
      dbUtil.updateTask(task.id, updatedTask);
    }
  };

  const listItemTextPrimary = () => {
    return (
      <div
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
        contentEditable={!task.isCompleted}
        data-gramm_editor="false"
        suppressContentEditableWarning={true}
        onBlur={(e) => updateTask(e)}
      >
        {task.task}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: task.taskColor }}>
      <div>{listItemTextPrimary()}</div>
      <div>{convertDate(task.timestamp)}</div>
      <div>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => dbUtil.handleTaskStatus(task.id, task.isCompleted)}
        />
        Task Color:
        <ColorPicker
          name="color"
          defaultValue={task.taskColor}
          onChange={(color) =>
            color ? dbUtil.updateColor(color, task.id) : ""
          }
        />
      </div>
      <div>
        <DeleteForeverIcon />
      </div>
    </div>
  );
}
