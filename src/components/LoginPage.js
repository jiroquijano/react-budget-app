import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export const LogInPage = (props) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Budget App</h1>
            <p>it's time to get your budget under control</p>
            <button className="button" onClick={props.startLogin}> Login with Google </button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin : () => dispatch(startLogin())
});

const ConnectedLoginPage = connect(undefined, mapDispatchToProps)(LogInPage);

export default ConnectedLoginPage;