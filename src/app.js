import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();


store.subscribe(()=>{
    console.log(getVisibleExpenses(store.getState()));
});

store.dispatch(addExpense({
    description: 'Water Bill',
    amount: 500,
    createdAt: 5000
}));


store.dispatch(addExpense({
    description: 'Electricity Bill',
    amount: 2500,
    createdAt: 2000
}));

store.dispatch(addExpense({
    description: 'Rent',
    amount: 21000,
    createdAt: 3000
}));

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)
ReactDOM.render(jsx,document.querySelector('#app'));