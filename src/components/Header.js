import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Budget app</h1>
                </Link>
                <button onClick={props.startLogout}>Log out</button>  
            </div>
        </div>
    </header>
        
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => {dispatch(startLogout())}
});

const ConnectedHeader = connect(undefined, mapDispatchToProps)(Header);

export default ConnectedHeader;