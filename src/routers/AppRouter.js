import React from 'react';
import {BrowserRouter, Route, NavLink,Switch} from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js';
import AddExpensePage from '../components/AddExpensePage.js';
import EditExpensePage from '../components/EditExpensePage.js';
import HelpPage from '../components/HelpPage.js';
import NotFoundPage from '../components/NotFoundPage.js';
import Header from '../components/Header.js';

const AppRouter = ()=>(
    <BrowserRouter>
        <Header/>
        <Switch>
            <Route path="/" exact component={ExpenseDashboardPage}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;