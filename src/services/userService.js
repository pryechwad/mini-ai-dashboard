import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const USERS_COLLECTION = "users";

export const saveUserRegistration = async (uid, email) => {
  try {
    await addDoc(collection(db, USERS_COLLECTION), {
      uid,
      email,
      registrationDate: Date.now(),
      lastLogin: Date.now()
    });
  } catch (error) {
    console.error("Error saving user registration:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const usersQuery = query(collection(db, USERS_COLLECTION), orderBy("registrationDate", "desc"));
    const usersSnapshot = await getDocs(usersQuery);
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};