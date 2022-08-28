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

// interface Context {
//   authUser: AuthUser | null;
//   login: (email: string, password: string) => Promise<void>;
//   loginLoading: boolean;
//   logout: () => Promise<void>;
// }

const AuthenticationContext = createContext({
  authUser: null,
  registerAuthUser: () =>
    Promise.reject("Unable to find AuthenticationProvider."),
  login: () => Promise.reject("Unable to find AuthenticationProvider."),
  logout: () => Promise.reject("Unable to find AuthenticationProvider."),
  loginLoading: false,
});

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
  const [authenticating, setAuthenticating] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [userSnapshot, loadingUser, errorUser] = useDocument(
    firebaseUser ? firestore.collection("users").doc(firebaseUser.uid) : null
  );

  console.log("firebaseUser.uid->", firebaseUser?.uid);
  console.log("userSnapshot->", userSnapshot);

  useMemo(() => {
    auth.onAuthStateChanged((currentUser) =>
      currentUser ? setFirebaseUser(currentUser) : onLogout()
    );
  }, []);

  useEffect(() => {
    !loadingUser && userSnapshot && !errorUser && onLogin(userSnapshot?.data());
  }, [loadingUser, userSnapshot]);

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
      setLoginLoading(false);
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
    } finally {
      setLoginLoading(false);
    }
  };

  const registerAuthUser = async (email, password) => {
    try {
      setLoginLoading(true);

      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      console.log("response->", response);

      const [providerData] = response.user.providerData;
      const uid = response.user.uid;

      await firestore
        .collection("users")
        .doc(uid)
        .set(assign({}, { id: uid }));

      await login(email, password);
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

  if (authenticating) return <Spinner fullscreen />;

  return (
    <AuthenticationContext.Provider
      value={{
        authUser,
        registerAuthUser,
        login,
        logout,
        loginLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
