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

// display: flex;
//   justify-content: space-between;
//   align-items: center;
const FilterBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
  margin-top: 15px;
  padding: 35px 10px 35px 10px;
  border-radius: 8px;
  
  width: 60%;
  word-break: break-word;
  background-color: #e0ebeb;

  & label {
    display: flex;
    align-items: center;
    padding: 30px;
  }

  & input[type=checkbox] {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }

  & input[type=text] {
    margin-left: 15px;
  }
`;

export { AppWrapper, TaskWrapper, TaskInput, AddTaskButton, FilterBar };
