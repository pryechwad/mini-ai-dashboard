import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const CHAT_COLLECTION = "teamChat";

export const saveMessage = async (message) => {
  await addDoc(collection(db, CHAT_COLLECTION), {
    ...message,
    timestamp: Date.now(),
  });
};

export const listenToMessages = (callback) => {
  const q = query(
    collection(db, CHAT_COLLECTION),
    orderBy("timestamp", "asc")
  );
  return onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};