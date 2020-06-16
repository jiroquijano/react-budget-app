import React from 'react';
import {Router, Route,Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js';
import AddExpensePage from '../components/AddExpensePage.js';
import EditExpensePage from '../components/EditExpensePage.js';
import HelpPage from '../components/HelpPage.js';
import NotFoundPage from '../components/NotFoundPage.js';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = ()=>(
    <Router history={history}>
        <Switch>
            <PublicRoute path="/" exact component={LoginPage}/>
            <PrivateRoute path="/dashboard" exact component={ExpenseDashboardPage}/>
            <PrivateRoute path="/create" component={AddExpensePage}/>
            <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
            <PrivateRoute path="/help" component={HelpPage}/>
            <PrivateRoute component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default AppRouter;