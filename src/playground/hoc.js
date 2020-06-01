//Higher Order Component (HOC) - A component that renders another component
//Reuse code
//Render hijacking
//Prop manipulation
//abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props)=>(
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) =>{
    return (props) =>(
        <div>
            {props.isAdmin && <p>This is private info. Please don't share</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) =>(
        <div>
            {
                props.isAuthenticated ? <WrappedComponent {...props}/> : 
                <p>Please log in to see the information</p>   
            }
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
//ReactDOM.render(<AdminInfo isAdmin={false} info='jiro'/>, document.querySelector('#app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='jiro'/>, document.querySelector('#app'));