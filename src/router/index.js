import {Route, Switch} from 'react-router-dom';
import {Home} from '../pages/Home'
import {Nosotros} from '../pages/Nosotros'
import {User} from "../pages/User";
import {Users} from "../pages/Users";
import {Layout} from "../components/Layout";
import {Redirect} from "react-router";
import {Page404} from "../components/Page404";


export const Router = () => {
    return <Switch>
        <Route
            exact
            path="/"
            render={() => <Layout> <Home/> </Layout>}
        />
        <Route
            exact
            path="/nosotros"
        >
            <Layout>
                <Nosotros/>
            </Layout>
        </Route>
        <Route
            exact
            path="/users"
        >
            <Layout>
                <Users/>
            </Layout>
        </Route>
        <Route
            exact
            path="/users/:userEmail"
        >
            <Layout>
                <User/>
            </Layout>
        </Route>
        <Route path="*" component={Page404} />
        <Redirect to="/" />
    </Switch>
}