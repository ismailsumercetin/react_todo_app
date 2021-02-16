import React, { useState, useEffect } from "react";

//modals
import LoginModal from "./modal/LoginModal";
import SignUpModal from "./modal/SignUpModal";

//component
import App from "./App";

//style
import { ModalBackground, ModalFormSigninButton } from "./style/styleModal";

//auth
import { getCurrentUser } from "./auth_util";

const BaseApp = () => {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (getCurrentUser()) {
        handleIsSignedIn();
      }
    }, 1000);
  }, []);

  const closeModalHandler = () => {
    setShowModal(false);
    setShowRegisterModal(false);
  };

  const handleIsSignedIn = () => {
    setIsSignedIn(true);
  };

  const handleIsSignedOut = () => {
    setIsSignedIn(false);
  };

  const handleAuthRender = () => {
    if (!getCurrentUser()) {
      return (
        <>
          {showModal || showRegisterModal ? (
            <ModalBackground onClick={closeModalHandler} />
          ) : null}
          <div>
            {showModal ? (
              <LoginModal
                close={closeModalHandler}
                handleIsSignedIn={handleIsSignedIn}
              />
            ) : null}
            {showRegisterModal ? (
              <SignUpModal
                close={closeModalHandler}
                handleIsSignedIn={handleIsSignedIn}
              />
            ) : null}

            <ModalFormSigninButton onClick={() => setShowModal(true)}>
              Login
            </ModalFormSigninButton>
            <ModalFormSigninButton onClick={() => setShowRegisterModal(true)}>
              Sign Up
            </ModalFormSigninButton>
          </div>
        </>
      );
    }
    return <App handleIsSignedOut={handleIsSignedOut} />;
  };

  return <div>{handleAuthRender()}</div>;
};

export default BaseApp;
