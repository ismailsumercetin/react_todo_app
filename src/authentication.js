import { auth } from "./firebase";

const loginUser = (email, password, handleIsSignedIn, close) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      handleIsSignedIn();
      close();
    })
    .catch((error) => {
      console.log(error);
    });
};

const logoutUser = (handleIsSignedOut) => {
  auth
    .signOut()
    .then(() => {
      handleIsSignedOut();
    })
    .catch((error) => {
      console.log(error);
    });
};

export { loginUser, logoutUser };
