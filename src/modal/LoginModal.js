import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { loginUser } from "../auth_util";
import {
  ModalWrapper,
  ModalCloseButtonTop,
  ModalContent,
  ModalBody,
  ModalBodyTitle,
  ModalFormItemWrapper,
  ModalFormSigninButton,
} from "../style/styleModal";

const modalRoot = document.querySelector("#modal-root");
const el = document.createElement("div");

export default function LoginModal({ close, handleIsSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    loginUser(email, password, handleIsSignedIn, close);
  };

  const loginModal = (
    <ModalWrapper>
      <ModalContent>
        <ModalCloseButtonTop onClick={close}>x</ModalCloseButtonTop>
        <ModalBody>
          <ModalBodyTitle>Sign in</ModalBodyTitle>
          <form>
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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <ModalFormSigninButton
                type="submit"
                onClick={(e) => handleLogin(e, email, password)}
              >
                Log In
              </ModalFormSigninButton>
            </ModalFormItemWrapper>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );

  return ReactDOM.createPortal(loginModal, el);
}
