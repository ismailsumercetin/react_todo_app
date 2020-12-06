import React, { useState } from "react";
import LoginModal from "./modal/LoginModal";
import { ModalBackground } from "./style/styleModal";

const BaseApp = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal ? <ModalBackground onClick={closeModalHandler} /> : null}
      <button onClick={() => setShowModal(true)}>Sign In</button>
      <button>Sign Up</button>
      <LoginModal show={showModal} close={closeModalHandler} />
    </div>
  );
};
export default BaseApp;
