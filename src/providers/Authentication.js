import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

export const AuthenticationContext = createContext({
  formData: null,
  onSetFormData: () => null,
  authUser: null,
  existsAuthUser: false,
});

export const AuthenticationProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [type, setType] = useState(null);

  const onSetFormData = (type = null, formData = null) => {
    setFormData(formData);
    setType(type);
  };

  useEffect(() => {
    if (formData) {
      console.log("type->", type);

      type === "login"
        ? onLoginUserEmailAndPassword()
        : onRegisterUserEmailAndPassword();
    }
  }, [formData]);

  const onRegisterUserEmailAndPassword = async () => {
    try {
      const { email, password } = formData;

      await auth.createUserWithEmailAndPassword(
        email.toLowerCase().trim(),
        password.toLowerCase().trim()
      );
    } catch (e) {
      console.error("Register email and pass:", e);
    }
  };

  const onLoginUserEmailAndPassword = async () => {
    try {
      const { email, password } = formData;

      await auth.signInWithEmailAndPassword(
        email.toLowerCase().trim(),
        password.toLowerCase().trim()
      );
    } catch (e) {
      console.error("Login email and pass:", e);
    }
  };

  console.log("authUser->", authUser);

  useMemo(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
      } else {
        console.error("Error on auth state changed!");
      }
    });
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authUser: authUser,
        existsAuthUser: !!authUser,
        onSetFormData: onSetFormData,
        formData: formData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
