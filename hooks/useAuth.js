import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../config/fire.config";

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props) {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (data) => {
    const response = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(data),
      });

    if (response.status === 200) {
      setUser({
        ...user,
        ...data,
      });
    } else {
      console.error(response);
    }
  };

  const getUserAdditionalData = async (uid) => {
    const response = await fetch(`/api/users/${uid}`);
    return response.json();
  };

  const updateUser = async ({ data, uid }) => {
    const response = await fetch(`/api/users/${uid}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setUser({
        ...user,
        ...data,
      });
    } else {
      console.error(response);
    }
  };

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };

  const signIn = async ({ email, password }) => {
    const response = await auth.signInWithEmailAndPassword(email, password);
    const user = await getUserAdditionalData(response.user.uid);
    setUser(user);
    return user;
  };

  const signOut = () => {
    return auth.signOut().then(() => setUser(false));
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  const handleAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      const fullUser = await getUserAdditionalData(user.uid);
      setUser(fullUser);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  return {
    loading,
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    updateUser,
  };
};
