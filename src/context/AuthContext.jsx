import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";


import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {

        if (user) {

          const docRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            setCurrentUser(docSnap.data());

          }

        } else {

          setCurrentUser(null);

        }

        setLoading(false);

      }
    );

    return () => unsubscribe();

  }, []);

  const signup = async (name, email, password) => {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(db, "users", userCredential.user.uid),
      {
        uid: userCredential.user.uid,
        name,
        email,
        createdAt: new Date(),
      }
    );

  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const logout = () => {

    return signOut(auth);

  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );

};