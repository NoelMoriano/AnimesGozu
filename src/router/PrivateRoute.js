import React from "react";
import { Route } from "react-router-dom";
import { useAuthentication } from "../providers";
import { useNavigate } from "react-router";

// interface Props {
//   render: () => React.ReactNode;
//   path: string;
//   exact?: boolean;
// }

export const PrivateRoute = ({ path, element }) => {
  const navigate = useNavigate();

  const { userAuth } = useAuthentication();

  return (
    <Route exact path={path} element={userAuth ? element() : navigate("/")} />
  );
};
