import { db, auth } from './firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveUserScore = async (score: number) => {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, "scores", user.uid);
  await setDoc(ref, { score }, { merge: true });
};

export const getUserScore = async () => {
  const user = auth.currentUser;
  if (!user) return 0;
  const ref = doc(db, "scores", user.uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().score : 0;
};

