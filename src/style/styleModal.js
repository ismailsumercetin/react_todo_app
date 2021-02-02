import styled from "styled-components";

const ModalWrapper = styled.div`
  margin: 0;
  padding: 0;
  text-align: left;
  box-sizing: border-box;
  background: white;
  width: 80%;
  max-width: 500px;
  margin: 4rem auto;
  transform: translate(0vh);
`;

const ModalCloseButtonTop = styled.span`
  color: #e3c8c8;
  font-size: 1.5rem;
  cursor: pointer;
  float: right;
  margin-top: 10px;
`;

const ModalContent = styled.div`
  padding: 0 1rem;
`;

const ModalBody = styled.div`
  padding: 3rem;
`;

const ModalBodyTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: black;
`;

const ModalBackground = styled.div`
  background: rgba(41, 42, 61, 0.9);
  height: 100%;
  width: 100%;
  position: fixed;
`;

const ModalFormItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  > label {
    font-weight: 300;
    margin-bottom: 10px;
  }
  > input {
    padding: 10px;
  }
`;

const ModalFormSigninButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background: #01bd6f;
  color: white;
  font-weight: 500;
`;

const ModalPasswordMatchIcon = styled.span`
  display: ${(props) => (props.password ? "inline" : "none")};
  content: ${(props) => (props.isMatch ? "tick" : "X")};
  background: ${(props) => (props.isMatch ? "#01bd6f" : "red")};
  border-radius: 3px;
  padding: 1px 2px 1px 2px;
  color: white;
`;

const VisibilityIconWrapper = styled.div`
  text-align: right;
`;

const ValidationWarningText = styled.div`
  border-radius: 4px;
  background: red;
  color: white;
  text-align: center;
  padding: 10px;
`;

export {
  ModalWrapper,
  ModalCloseButtonTop,
  ModalContent,
  ModalBody,
  ModalBodyTitle,
  ModalBackground,
  ModalFormItemWrapper,
  ModalFormSigninButton,
  ModalPasswordMatchIcon,
  VisibilityIconWrapper,
  ValidationWarningText,
};
