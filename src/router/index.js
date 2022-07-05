import { Route, Switch } from "react-router-dom";
import { Layout } from "../components";
import { Redirect } from "react-router";
import { Home, Login, Register } from "../pages";

export const Router = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <Home />
          </Layout>
        )}
      />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Route path="*" component={<h1>404</h1>} />
      <Redirect to="/" />
    </Switch>
  );
};
