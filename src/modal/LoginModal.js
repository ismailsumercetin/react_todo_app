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
  VisibilityIconWrapper,
} from "../style/styleModal";

//icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const modalRoot = document.querySelector("#modal-root");
const el = document.createElement("div");

export default function LoginModal({ close, handleIsSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisibility, setPwVisibility] = useState(false);

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

  const handleVisibility = () => {
    setPwVisibility(!pwVisibility);
  };

  const loginModal = (
    <ModalWrapper>
      <ModalContent>
        <ModalCloseButtonTop onClick={close}>x</ModalCloseButtonTop>
        <ModalBody>
          <ModalBodyTitle>Login</ModalBodyTitle>
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
                type={!pwVisibility ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <VisibilityIconWrapper>
                {!pwVisibility ? (
                  <VisibilityIcon onClick={handleVisibility} />
                ) : (
                  <VisibilityOffIcon onClick={handleVisibility} />
                )}
              </VisibilityIconWrapper>
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <ModalFormSigninButton
                type="submit"
                onClick={(e) => handleLogin(e, email, password)}
              >
                Login
              </ModalFormSigninButton>
            </ModalFormItemWrapper>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );

  return ReactDOM.createPortal(loginModal, el);
}
