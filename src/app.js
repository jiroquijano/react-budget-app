import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {startSetExpenses, startAddExpense} from './actions/expenses';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import './firebase/firebase';

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