import React, { useState } from "react";
import { loginUser } from "../authentication";
import {
  ModalWrapper,
  ModalCloseButtonTop,
  ModalContent,
  ModalBody,
  ModalBodyTitle,
  ModalFormItemWrapper,
  ModalFormSigninButton,
} from "../style/styleModal";

export default function LoginModal({ show, close, handleIsSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    loginUser(email, password, handleIsSignedIn, close);
  };

  return (
    <ModalWrapper show={show}>
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
              />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
}
