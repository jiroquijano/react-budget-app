import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => (
    <header>
        <h1>Expensify App</h1>
        <NavLink activeClassName="is-active" exact to="/dashboard">DASHBOARD | </NavLink>
        <NavLink activeClassName="is-active" exact to="/create"> ADD EXPENSE | </NavLink>
        <NavLink activeClassName="is-active" exact to="/help"> HELP | </NavLink>
        <button onClick={props.startLogout}> Log out </button>
    </header>
        
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => {dispatch(startLogout())}
});

const ConnectedHeader = connect(undefined, mapDispatchToProps)(Header);

export default ConnectedHeader;