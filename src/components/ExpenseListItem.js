import React from 'react';
import {connect} from 'react-redux';
import {removeExpense} from '../actions/expenses';

const ExpenseListItem = ({id, description, amount, createdAt,dispatch}) => (
    <div>
        <h3>{description}</h3>
        <p>Amount: {amount} | Created at: {createdAt}</p>
        <button onClick={()=>{
            dispatch(removeExpense(id));
        }}>Remove</button>
    </div>
);

const ConnectedExpenseListItem = connect()(ExpenseListItem);

export default ConnectedExpenseListItem;