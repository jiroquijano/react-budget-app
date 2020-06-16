import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {login, logout} from './actions/auth';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import {firebase} from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

let hasRendered = false;

const renderApp = () =>{
    if(!hasRendered) {
        ReactDOM.render(jsx,document.querySelector('#app'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>,document.querySelector('#app'));

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname === '/'){
                history.push('dashboard')
            }
        });
    }else{
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
})