import { db } from "./firebase";
import firebase from "firebase";
import { getCurrentUser } from "./auth_util";

const COLLECTION_NAMES = {
  TASKS: "tasks",
  USERS: "users",
};

const COLLECTION_PROPS = {
  TIMESTAMP: "timestamp",
  OWNER_ID: "ownerId",
};

const getCurrentUserTasks = (setTasks) => {
  try {
    const { uid } = getCurrentUser();
    db.collection(COLLECTION_NAMES.TASKS)
      .orderBy(COLLECTION_PROPS.TIMESTAMP, "desc")
      .where(COLLECTION_PROPS.OWNER_ID, "==", uid)
      .onSnapshot((snapshot) => {
        const task = snapshot.docs.map((doc) => ({
          id: doc.id,
          task: doc.data().task,
          timestamp: doc.data().timestamp,
          isCompleted: doc.data().isCompleted,
          taskColor: doc.data().taskColor,
        }));
        setTasks(task);
      });
  } catch (error) {
    alert(error);
  }
};

// const getAllUsers = (setUsers) => {
//   try {
//     db.collection(COLLECTION_NAMES.USERS).onSnapshot((snapshot) => {
//       const user = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         name: doc.data().name,
//       }));
//       setUsers(user);
//     });
//   } catch (error) {
//     alert(error);
//   }
// };

// const getTasksByUserId = (setTasks, inputUser) => {
//   try {
//     db.collection(COLLECTION_NAMES.TASKS)
//       .orderBy(COLLECTION_PROPS.TIMESTAMP, "desc")
//       .where(COLLECTION_PROPS.OWNER_ID, "==", inputUser)
//       .onSnapshot((snapshot) => {
//         const task = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           task: doc.data().task,
//           timestamp: doc.data().timestamp,
//           isCompleted: doc.data().isCompleted,
//           taskColor: doc.data().taskColor,
//         }));
//         setTasks(task);
//       });
//   } catch (error) {
//     alert(error);
//   }
// };

const addTask = (input, inputUser, setInput) => {
  try {
    const task = {
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //timestamp of the server
      ownerId: inputUser,
      isCompleted: false,
      taskColor: "#ffffff",
    };

    db.collection(COLLECTION_NAMES.TASKS).add(task);

    setInput("");
  } catch (error) {
    alert(error);
  }
};

const updateColor = (color, taskId) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).doc(taskId).update({
      taskColor: color,
    });
  } catch (error) {
    alert(error);
  }
};

const deleteTask = (taskId) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).doc(taskId).delete();
  } catch (error) {
    alert(error);
  }
};

const updateTask = (taskId, input) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).doc(taskId).update({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      isCompleted: false,
    });
  } catch (error) {
    alert(error);
  }
};

const handleTaskStatus = (taskId, isCompletedCurrent) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).doc(taskId).update({
      isCompleted: !isCompletedCurrent,
    });
  } catch (error) {
    alert(error);
  }
};

const createUser = (uid, email, username) => {
  try {
    db.collection(COLLECTION_NAMES.USERS).doc(uid).set({
      email: email,
      name: username,
    });
  } catch (error) {
    alert(error);
  }
};

export default {
  // getAllUsers,
  // getTasksByUserId,
  getCurrentUserTasks,
  addTask,
  updateColor,
  deleteTask,
  updateTask,
  handleTaskStatus,
  createUser,
};
