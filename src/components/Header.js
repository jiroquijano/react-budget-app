import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink activeClassName="is-active" exact to="/">HOME | </NavLink>
        <NavLink activeClassName="is-active" exact to="/create"> ADD EXPENSE | </NavLink>
        <NavLink activeClassName="is-active" exact to="/help"> HELP | </NavLink>
    </header>
        
);

export default Header;