import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export const LogInPage = (props) => (
    <div>
        <button onClick={props.startLogin}> Login </button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin : () => dispatch(startLogin())
});

const ConnectedLoginPage = connect(undefined, mapDispatchToProps)(LogInPage);

export default ConnectedLoginPage;