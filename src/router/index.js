import {Route, Switch} from 'react-router-dom';
import {Layout} from "../components/Layout";
import {Redirect} from "react-router";
import {Page404} from "../components/Page404";
import {Home, Login, Register} from "../pages";


export const Router = () => {
    return <Switch>
        <Route
            exact
            path="/"
            render={() => <Layout> <Home/> </Layout>}
        />
        <Route
            exact
            path="/login"
            render={() => <Layout> <Login/> </Layout>}
        />
        <Route
            exact
            path="/register"
            render={() => <Layout> <Register/> </Layout>}
        />
        <Route path="*" component={Page404} />
        <Redirect to="/" />
    </Switch>
}