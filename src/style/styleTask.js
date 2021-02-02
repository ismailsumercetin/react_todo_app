import styled from "styled-components";

const TaskWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  word-break: break-word;
  background-color: #f5f5f5;
  padding: 10px;
  &:nth-child(1) {
    border-radius: 8px 8px 0 0;
  }
  &:nth-last-child(1) {
    border-radius: 0 0 8px 8px;
  }
  &:nth-child(even) {
    background-color: #e0ebeb;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #dae8e8;
  }
`;

const ColorPickerWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: ${(props) => props.taskColor};
  &:hover {
    cursor: pointer;
  }
`;

const CheckboxInput = styled.input.attrs((props) => ({
  type: "checkbox",
  checked: props.isCompleted,
}))`
  width: 22px;
  height: 22px;
`;

const SubWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TimeStampText = styled.span`
  font-size: small;
  font-style: italic;
  margin-left: 12px;
  color: gray;
`;

const TaskText = styled.p.attrs((props) => ({
  contentEditable: !props.isCompleted,
}))`
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  max-width: 60%;
`;

export {
  TaskText,
  TimeStampText,
  SubWrapper,
  CheckboxInput,
  TaskWrapper,
  ColorPickerWrapper,
};
