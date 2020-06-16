import React from 'react'
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute =  ({isAuthenticated, component:Component, path, ...rest}) => (
    <Route 
        component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header/>
                    <Component {...props}/>
                </div>
            ):(
                <Redirect to='/'/>
            )
        )}
        {...rest}
    />
);

const mapStateToProps = (state) =>({
    isAuthenticated: !!state.auth.uid
});

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export default ConnectedPrivateRoute;