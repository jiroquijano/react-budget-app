import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import {firebase} from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)
ReactDOM.render(<p>Loading...</p>,document.querySelector('#app'));
store.dispatch(startSetExpenses()).then(()=>{
    ReactDOM.render(jsx,document.querySelector('#app'));
});

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        console.log('log in');
        
    }else{
        console.log('log out');
        
    }
})