import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({path, component:Component, isAuthenticated, ...rest}) =>(
    <Route
        component={
            (props) => (
                isAuthenticated ? (
                    <Redirect to='/dashboard'/>
                ) : (
                    <Component {...props}/>
                )
            )}
        {...rest}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated : !!state.auth.uid
})

const ConnectedPublicRoute = connect(mapStateToProps)(PublicRoute);

export default ConnectedPublicRoute;