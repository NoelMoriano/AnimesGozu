import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, firestore } from "../firebase/index";
import { firebase } from "../firebase/config";
import { isError, assign } from "lodash";
import { useDocument } from "react-firebase-hooks/firestore";
import { timeoutPromise } from "../utils";
import { spinLoaderFixed } from "../utils/loader";

const AuthenticationContext = createContext({
  authUser: null,
  registerAuthUser: () =>
    Promise.reject("Unable to find AuthenticationProvider."),
  login: () => Promise.reject("Unable to find AuthenticationProvider."),
  loginWithGoogle: () =>
    Promise.reject("Unable to find AuthenticationProvider."),
  logout: () => Promise.reject("Unable to find AuthenticationProvider."),
  loginLoading: false,
  googleLoginLoading: false,
});

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
  const [authenticating, setAuthenticating] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const [registerAuthUserData, setRegisterAuthUserData] = useState(null);

  const [userSnapshot, loadingUser, errorUser] = useDocument(
    firebaseUser ? firestore.collection("users").doc(firebaseUser.uid) : null
  );

  useMemo(() => {
    auth.onAuthStateChanged((currentUser) =>
      currentUser ? previousAuthenticationUser(currentUser) : onLogout()
    );
  }, []);

  const previousAuthenticationUser = async (currentUser) => {
    try {
      const uid = currentUser.uid;
      const [providerData] = currentUser.providerData;

      const userExists = (
        await firestore.collection("users").doc(uid).get()
      ).data();

      if (userExists) {
        setFirebaseUser(currentUser);
        await timeoutPromise(900);
        setLoginLoading(false);
        return setGoogleLoginLoading(false);
      }

      await firestore
        .collection("users")
        .doc(uid)
        .set(
          assign({}, registerAuthUserData, {
            id: uid,
            nickName:
              providerData?.displayName ||
              registerAuthUserData?.firstName ||
              null,
            providerData: mapProviderData(providerData),
            ...(providerData?.displayName && {
              nickName: providerData.displayName,
            }),
            ...(providerData?.email && { email: providerData.email }),
            createAt: new Date(),
          }),
          { merge: true }
        );

      await timeoutPromise(4000);

      await setFirebaseUser(currentUser);

      setLoginLoading(false);
      setGoogleLoginLoading(false);
    } catch (e) {
      console.error("previousAuthenticationUser:", e);
    } finally {
      setRegisterAuthUserData(null);
    }
  };

  useEffect(() => {
    !loadingUser && userSnapshot && !errorUser && onLogin(userSnapshot?.data());
  }, [loadingUser, userSnapshot]);

  const mapProviderData = (providerData) => ({
    displayName: providerData?.displayName || null,
    email: providerData.email,
    phoneNumber: providerData?.phoneNumber || null,
    photoURL: providerData?.photoURL || null,
    providerId: providerData.providerId,
    uid: providerData.uid,
  });

  const onLogout = async () => {
    setAuthenticating(true);

    setAuthUser(null);
    setFirebaseUser(null);
    setAuthenticating(false);
    setLoginLoading(false);
    setGoogleLoginLoading(false);
    setRegisterAuthUserData(null);
  };

  const onLogin = async (user) => {
    try {
      setLoginLoading(true);

      if (!user) throw new Error("User doesn't exists");

      setAuthUser(user);
      setAuthenticating(false);
    } catch (error) {
      console.error("Login", error);

      if (isError(error)) {
        alert(
          JSON.stringify({
            type: "error",
            title: "Login error",
            description: `${error.message}`,
          })
        );
      }

      await logout();
    }
  };

  const login = async (email, password) => {
    try {
      setLoginLoading(true);

      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      const error = isError(e) ? e : undefined;

      console.error("singInUser:", e);

      alert(
        JSON.stringify({
          type: "error",
          title: "Login error",
          description: error?.message,
        })
      );

      setLoginLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setGoogleLoginLoading(true);

      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/plus.login");

      await auth.signInWithPopup(provider);
    } catch (e) {
      const error = isError(e) ? e : undefined;

      console.error("singInUser:", e);

      alert(
        JSON.stringify({
          type: "error",
          title: "Login error",
          description: error?.message,
        })
      );

      setGoogleLoginLoading(false);
    }
  };

  const registerAuthUser = async (formData) => {
    try {
      setLoginLoading(true);
      setRegisterAuthUserData(null);

      await timeoutPromise(1000);

      setRegisterAuthUserData(formData);

      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
    } catch (e) {
      const error = isError(e) ? e : undefined;

      console.error("registerAuthUser:", e);

      alert(
        JSON.stringify({
          type: "error",
          title: "Register error",
          description: error?.message,
        })
      );

      setLoginLoading(false);
    }
  };

  const logout = async () => {
    sessionStorage.clear();
    localStorage.clear();

    setRegisterAuthUserData(null);

    return auth.signOut();
  };

  if (authenticating) return spinLoaderFixed();

  return (
    <AuthenticationContext.Provider
      value={{
        authUser,
        registerAuthUser,
        login,
        loginWithGoogle,
        logout,
        loginLoading,
        googleLoginLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
