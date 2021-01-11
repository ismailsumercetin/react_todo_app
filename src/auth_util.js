import { auth } from "./firebase";
import dbUtil from "./db_util";

const signupUser = (username, email, password, handleIsSignedIn) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dbUtil.createUser(user.user.uid, email, username);
      handleIsSignedIn();
    })
    .catch((error) => {
      console.log(error);
    });
};

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

const getCurrentUser = () => {
  const user = auth.currentUser;

  return user;
};

export { signupUser, loginUser, logoutUser, getCurrentUser };
