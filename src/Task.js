import React from "react";
import ColorPicker from "material-ui-color-picker";

//icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//database util file
import dbUtil from "./db_util";

//style
import {
  CheckboxInput,
  TaskWrapper,
  ColorPickerWrapper,
  SubWrapper,
  TimeStampText,
  TaskText,
} from "./style/styleTask";

export default function Task({ task }) {
  const convertDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp.seconds * 1000).toLocaleString();
      return date;
    }
  };

  const updateTask = (e) => {
    let updatedTask = e.target.textContent.trim();
    
    (updatedTask !== task.task && !!updatedTask.length) ? 
    dbUtil.updateTask(task.id, updatedTask) : 
    dbUtil.deleteTask(task.id);
   
  };

  const listItemTextPrimary = () => {
    return (
      <TaskText
        isCompleted={task.isCompleted}
        data-gramm_editor="false"
        suppressContentEditableWarning={true}
        onBlur={(e) => updateTask(e)}
      >
        {task.task}
      </TaskText>
    );
  };

  return (
    <TaskWrapper>
      <SubWrapper>
        <CheckboxInput
          isCompleted={task.isCompleted}
          onChange={() => dbUtil.handleTaskStatus(task.id, task.isCompleted)}
        />
        {listItemTextPrimary()}
        <TimeStampText>{convertDate(task.timestamp)}</TimeStampText>
      </SubWrapper>
      <SubWrapper>
        <ColorPickerWrapper taskColor={task.taskColor}>
          <ColorPicker
            name="color"
            defaultValue={task.taskColor}
            onChange={(color) =>
              color ? dbUtil.updateColor(color, task.id) : ""
            }
          />
        </ColorPickerWrapper>
        <DeleteForeverIcon onClick={() => dbUtil.deleteTask(task.id)} />
      </SubWrapper>
    </TaskWrapper>
  );
}
