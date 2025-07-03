import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const PROMPT_COLLECTION = "prompts";

export const savePrompt = async (uid, prompt) => {
  try {
    console.log('Attempting to save prompt to Firestore:', { uid, prompt });
    const docRef = await addDoc(collection(db, PROMPT_COLLECTION), {
      uid,
      prompt,
      timestamp: Date.now(),
    });
    console.log('Prompt saved with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Firestore save error:', error);
    throw error;
  }
};

export const listenToPrompts = (uid, callback) => {
  try {
    console.log('Setting up Firestore listener for uid:', uid);
    const q = query(
      collection(db, PROMPT_COLLECTION),
      where("uid", "==", uid),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, 
      (snapshot) => {
        console.log('Firestore snapshot received, docs count:', snapshot.docs.length);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Processed prompts data:', data);
        callback(data);
      },
      (error) => {
        console.error('Firestore listener error:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error setting up Firestore listener:', error);
    callback([]);
    return () => {};
  }
};
