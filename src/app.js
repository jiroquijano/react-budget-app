import ReactDOM from 'react-dom';
import React from 'react';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setEndDate, setStartDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
const store = configureStore();

store.subscribe(()=>{
    console.log(getVisibleExpenses(store.getState()));
});

const firstExpense = store.dispatch(addExpense({
    description: 'Water Bill',
    amount: 500,
    createdAt: 5000
}));

const secondExpense = store.dispatch(addExpense({
    description: 'Electricity Bill',
    amout: 2500,
    createdAt: 2000
}));

store.dispatch(setTextFilter('bill'));

ReactDOM.render(<AppRouter/>,document.querySelector('#app'));