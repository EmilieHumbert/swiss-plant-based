import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../config/fire.config";

const authContext = createContext({ user: {} });
const { Provider } = authContext;

const prepareUser = (user, { password: _password, ...data } = {}) => {
  if (!user) return null;

  return {
    ...user,
    ...data,
  };
};

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
      setUser(prepareUser(response.user, data));
    } else {
      console.error(response);
    }
  };

  const getUserAdditionalData = async (uid) => {
    const response = await fetch(`/api/users/${uid}`);
    return response.json();
  };

  const updateUser = async ({ data, uid }) => {
    if (data.email) {
      await auth.currentUser.updateEmail(data.email);
    }

    if (data.password) {
      await auth.currentUser.updatePassword(data.password);
    }

    if (data.name || data.location) {
      const response = await fetch(`/api/users/${uid}`, {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          location: data.location,
        }),
      });

      if (!response.ok) {
        throw new Error(response);
      }
    }

    setUser(prepareUser(user, data));
  };

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({ uid: response.user.uid, email, name });
      });
  };

  const signIn = async ({ email, password }) => {
    const response = await auth.signInWithEmailAndPassword(email, password);
    const data = await getUserAdditionalData(response.user.uid);
    const fullUser = prepareUser(response.user, data);
    setUser(fullUser);
    return fullUser;
  };

  const signOut = () => {
    return auth.signOut().then(() => setUser(null));
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  const handleAuthStateChanged = async (user) => {
    setUser(prepareUser(user));
    if (user) {
      const data = await getUserAdditionalData(user.uid);
      setUser(prepareUser(user, data));
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
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
