import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const getCurrentUser = () => auth.currentUser;

export const isAuthenticated = () => !!auth.currentUser;

export const getCurrentUserId = () => auth.currentUser?.uid;

export const getCurrentUserEmail = () => auth.currentUser?.email;

export const getCurrentUserDisplayName = () => auth.currentUser?.displayName;

