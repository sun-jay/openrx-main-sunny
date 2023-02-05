import { db } from "./clientApp";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");
class UserDataService {
  addUser = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };

  updateUser = (id, updatedUser) => {
    const bookDoc = doc(db, "users", id);
    return updateDoc(bookDoc, updatedUser);
  };

  deleteUser = (id) => {
    const bookDoc = doc(db, "users", id);
    return deleteDoc(bookDoc);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

  getUser = (id) => {
    const bookDoc = doc(db, "users", id);
    return getDoc(bookDoc);
  };
  // setUser = (id, user) => {
  //    return setDoc(userCollectionRef, user);
  // }
}

export default new UserDataService();
