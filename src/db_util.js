import db from "./firebase";
import firebase from "firebase";

const COLLECTION_NAMES = {
  TASKS: "tasks",
  USERS: "users",
};

const COLLECTION_PROPS = {
  TIMESTAMP: "timestamp",
  OWNER_ID: "ownerId",
};

const getAllUsers = (setUsers) => {
  try {
    db.collection(COLLECTION_NAMES.USERS).onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
      );
    });
  } catch (error) {
    alert(error);
  }
};

const getTasksByUserId = (setTasks, inputUser) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS)
      .orderBy(COLLECTION_PROPS.TIMESTAMP, "desc")
      .where(COLLECTION_PROPS.OWNER_ID, "==", inputUser)
      .onSnapshot((snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            task: doc.data().task,
            timestamp: doc.data().timestamp,
            isCompleted: doc.data().isCompleted,
            taskColor: doc.data().taskColor,
          }))
        );
      });
  } catch (error) {
    alert(error);
  }
};

const addTask = (input, inputUser, setInput, setHandleSnackbar) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //timestamp of the server
      ownerId: inputUser,
      isCompleted: false,
      taskColor: "#ffffff",
    });

    setInput("");
    setHandleSnackbar({
      messageText: "Task has been added successfully!",
      isActive: true,
    });
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

const deleteTask = (taskId, setHandleSnackbar, handleModalClose) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).doc(taskId).delete();
    setHandleSnackbar();
    handleModalClose();
  } catch (error) {
    alert(error);
  }
};

const updateTask = (taskId, input, setOpen) => {
  try {
    db.collection(COLLECTION_NAMES.TASKS).doc(taskId).update({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      isCompleted: false,
    });
  } catch (error) {
    alert(error);
  }

  setOpen(false);
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

export default {
  getAllUsers,
  getTasksByUserId,
  addTask,
  updateColor,
  deleteTask,
  updateTask,
  handleTaskStatus,
};
