import React from "react";
import {
  ModalWrapper,
  ModalCloseButtonTop,
  ModalContent,
  ModalBody,
  ModalBodyTitle,
  ModalFormItemWrapper,
  ModalFormSigninButton,
} from "../style/styleModal";

export default function LoginModal({ show, close }) {
  return (
    <ModalWrapper show={show}>
      <ModalContent>
        <ModalCloseButtonTop onClick={close}>x</ModalCloseButtonTop>
        <ModalBody>
          <ModalBodyTitle>Sign in</ModalBodyTitle>
          <form>
            <ModalFormItemWrapper>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </ModalFormItemWrapper>
            <ModalFormItemWrapper>
              <ModalFormSigninButton type="submit">
                Log In
              </ModalFormSigninButton>
            </ModalFormItemWrapper>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );
}
