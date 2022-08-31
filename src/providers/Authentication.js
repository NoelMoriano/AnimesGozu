import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, firestore } from "../firebase";
import { firebase } from "../firebase/config";
import { assign, isError } from "lodash";
import { useDocument } from "react-firebase-hooks/firestore";
import { Spinner } from "../components";
import { timeoutPromise } from "../utils";

const AuthenticationContext = createContext({
  authUser: null,
  registerAuthUser: () =>
    Promise.reject("Unable to find AuthenticationProvider."),
  login: () => Promise.reject("Unable to find AuthenticationProvider."),
  loginWithGoogle: () =>
    Promise.reject("Unable to find AuthenticationProvider."),
  logout: () => Promise.reject("Unable to find AuthenticationProvider."),
  loginLoading: false,
});

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
  const [authenticating, setAuthenticating] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerAuthUserData, setRegisterAuthUserData] = useState(null);

  const [userSnapshot, loadingUser, errorUser] = useDocument(
    firebaseUser ? firestore.collection("users").doc(firebaseUser.uid) : null
  );

  useMemo(() => {
    auth.onAuthStateChanged(async (currentUser) =>
      currentUser ? previusAuthenticationUser(currentUser) : onLogout()
    );
  }, []);

  const previusAuthenticationUser = async (currentUser) => {
    try {
      setLoginLoading(true);
      const uid = currentUser.uid;
      const [providerData] = currentUser.providerData;

      const userExists = (
        await firestore.collection("users").doc(uid).get()
      ).data();

      if (userExists) return setFirebaseUser(currentUser);

      await firestore
        .collection("users")
        .doc(uid)
        .set(
          assign(
            {},
            {
              id: uid,
              providerData: mapProviderData(providerData),
              ...(registerAuthUserData && registerAuthUserData),
              createAt: new Date(),
            }
          ),
          { merge: true }
        );

      await timeoutPromise(1000);

      return setFirebaseUser(currentUser);
    } catch (e) {
      console.error("previusAuthenticationUser:", e);
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    !loadingUser && userSnapshot && !errorUser && onLogin(userSnapshot?.data());
  }, [loadingUser, userSnapshot]);

  const mapProviderData = (providerData) => ({
    displayName: providerData?.displayName || null,
    email: providerData?.email || null,
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
  };

  const onLogin = async (user) => {
    try {
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
    } finally {
      setLoginLoading(false);
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
    } finally {
      setLoginLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoginLoading(true);

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
    } finally {
      setLoginLoading(false);
    }
  };

  const registerAuthUser = async (formData) => {
    try {
      setLoginLoading(true);

      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      console.log("formData->", formData);

      setRegisterAuthUserData(formData || null);
    } catch (e) {
      const error = isError(e) ? e : undefined;

      console.error("singUpUser:", e);

      alert(
        JSON.stringify({
          type: "error",
          title: "Register error",
          description: error?.message,
        })
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    sessionStorage.clear();
    localStorage.clear();

    return auth.signOut();
  };

  if (authenticating) return <Spinner height="90vh" />;

  return (
    <AuthenticationContext.Provider
      value={{
        authUser,
        registerAuthUser,
        login,
        loginWithGoogle,
        logout,
        loginLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
