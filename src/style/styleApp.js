import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
  padding: 10px 0px 30px 0px;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskInput = styled.input.attrs((props) => ({
  type: "text",
  placeholder: "Add a task...",
}))`
  &:focus {
    outline: none;
  }
  padding: 5px;
  border: none;
  border-bottom: 2px solid lightgray;
`;

const AddTaskButton = styled.button`
  padding: 12px;
  margin-left: 12px;
  border: none;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? "#77777724" : "#5251fb")};
  color: white;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
`;

export { AppWrapper, TaskWrapper, TaskInput, AddTaskButton };
