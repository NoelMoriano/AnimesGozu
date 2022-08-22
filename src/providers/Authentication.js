import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

export const AuthenticationContext = createContext({
  formData: null,
  onSetFormData: () => null,
  authUser: null,
  existsAuthUser: false,
});

export const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate();

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

      const response = await auth.createUserWithEmailAndPassword(
        email.toLowerCase().trim(),
        password.toLowerCase().trim()
      );

      const authUser_ = response.user.providerData[0];

      setAuthUser(authUser_);

      return navigate("/");
    } catch (e) {
      console.error("Register email and pass:", e);
    }
  };

  const onLoginUserEmailAndPassword = async () => {
    try {
      const { email, password } = formData;

      const response = await auth.signInWithEmailAndPassword(
        email.toLowerCase().trim(),
        password.toLowerCase().trim()
      );

      const authUser_ = response.user.providerData[0];

      setAuthUser(authUser_);

      return navigate("/");
    } catch (e) {
      console.error("Login email and pass:", e);
    }
  };

  /*  auth.onAuthStateChanged((user) => {
    if (user) {
      return navigate("/");
    } else {
      console.error("Error on auth state changed!");
    }
  });*/

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
