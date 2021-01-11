import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { signupUser } from "../auth_util";
import {
  ModalWrapper,
  ModalCloseButtonTop,
  ModalContent,
  ModalBody,
  ModalBodyTitle,
  ModalFormItemWrapper,
  ModalFormSigninButton,
  VisibilityIconWrapper,
  ValidationWarningText,
} from "../style/styleModal";

//icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const modalRoot = document.querySelector("#modal-root");
const el = document.createElement("div");

export default function SignUpModal({ close, handleIsSignedIn }) {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pwVisibility2, setPwVisibility2] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !email.trim() ||
      password.length === 0 ||
      password2.length === 0 ||
      !userName.trim()
    ) {
      setValidationError("Please Fill All Fields");
      return null;
    }

    if (password !== password2) {
      setValidationError("Passwords do not match");
      return null;
    }
    setValidationError("");

    signupUser(userName, email, password, handleIsSignedIn);
  };

  const handleVisibility = () => {
    setPwVisibility2(!pwVisibility2);
  };

  const SignUpModal = (
    <ModalWrapper>
      <ModalContent>
        <ModalCloseButtonTop onClick={close}>x</ModalCloseButtonTop>
        <ModalBody>
          <ModalBodyTitle>Sign up</ModalBodyTitle>
          <form>
            <ModalFormItemWrapper>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={!pwVisibility2 ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <label
                htmlFor="password2"
                style={{ opacity: password ? 1 : 0.5 }}
              >
                Re-enter Password
              </label>
              <input
                id="password2"
                name="password2"
                type={!pwVisibility2 ? "password" : "text"}
                disabled={!password.trim()}
                onChange={(e) => setPassword2(e.target.value)}
                autoComplete="off"
              />
              <VisibilityIconWrapper>
                {!pwVisibility2 ? (
                  <VisibilityIcon onClick={handleVisibility} />
                ) : (
                  <VisibilityOffIcon onClick={handleVisibility} />
                )}
              </VisibilityIconWrapper>
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <ModalFormSigninButton
                type="submit"
                onClick={(e) => handleSignup(e)}
              >
                Sign Up
              </ModalFormSigninButton>
            </ModalFormItemWrapper>
            <ValidationWarningText>{validationError}</ValidationWarningText>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );

  return ReactDOM.createPortal(SignUpModal, el);
}
