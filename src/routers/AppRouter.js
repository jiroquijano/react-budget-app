import React from 'react';
import {Router, Route,Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js';
import AddExpensePage from '../components/AddExpensePage.js';
import EditExpensePage from '../components/EditExpensePage.js';
import HelpPage from '../components/HelpPage.js';
import NotFoundPage from '../components/NotFoundPage.js';
import Header from '../components/Header.js';
import LoginPage from '../components/LoginPage';

export const history = createHistory();

const AppRouter = ()=>(
    <Router history={history}>
        <Header/>
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/dashboard" exact component={ExpenseDashboardPage}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit/:id" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default AppRouter;