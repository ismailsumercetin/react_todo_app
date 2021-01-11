import React, { useState } from "react";

//modals
import LoginModal from "./modal/LoginModal";
import SignUpModal from "./modal/SignUpModal";

//component
import App from "./App";

//style
import { ModalBackground } from "./style/styleModal";

//auth
import { getCurrentUser } from "./auth_util";

const BaseApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
        <div>
          {showModal || showRegisterModal ? (
            <ModalBackground onClick={closeModalHandler} />
          ) : null}
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
          <button onClick={() => setShowModal(true)}>Sign In</button>
          <button onClick={() => setShowRegisterModal(true)}>Sign Up</button>
        </div>
      );
    }
    return <App handleIsSignedOut={handleIsSignedOut} />;
  };

  return <div>{handleAuthRender()}</div>;
};
export default BaseApp;
