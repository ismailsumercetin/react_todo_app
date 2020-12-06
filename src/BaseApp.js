import React, { useState } from "react";
import LoginModal from "./modal/LoginModal";
import { ModalBackground } from "./style/styleModal";
import App from "./App";

const BaseApp = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleIsSignedIn = () => {
    setIsSignedIn(true);
  };

  const handleIsSignedOut = () => {
    setIsSignedIn(false);
  };

  const handleAuthRender = () => {
    if (!isSignedIn) {
      return (
        <div>
          {showModal ? <ModalBackground onClick={closeModalHandler} /> : null}
          <button onClick={() => setShowModal(true)}>Sign In</button>
          <button>Sign Up</button>
          <LoginModal
            show={showModal}
            close={closeModalHandler}
            handleIsSignedIn={handleIsSignedIn}
          />
        </div>
      );
    }
    return <App handleIsSignedOut={handleIsSignedOut} />;
  };

  return <div>{handleAuthRender()}</div>;
};
export default BaseApp;
