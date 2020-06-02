import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
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
    amount: 2500,
    createdAt: 2000
}));

store.dispatch(setTextFilter('water'));

setTimeout(()=>{
    store.dispatch(setTextFilter('bill'));
},2000);

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)
ReactDOM.render(jsx,document.querySelector('#app'));