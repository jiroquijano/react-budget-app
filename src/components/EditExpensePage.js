import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,removeExpense} from '../actions/expenses';

const EditExpensePage = (props) =>{
    return (<div>
        Edit Expense Page for id: {props.match.params.id}
        <ExpenseForm 
            expense={props.expense}
            onSubmit={(expense)=>{
                props.editExpenseDispatch(props.expense.id, expense);
                props.history.push("/");
            }}
        />
        <button onClick={()=>{
            props.removeExpenseDispatch(props.match.params.id);
            props.history.push("/");
        }}>Remove</button>
    </div>);
};

const mapStateToProps = (state,props) =>({
    expense: state.expenses.find((expense)=>expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) =>({
    editExpenseDispatch : (id, expense) => dispatch(editExpense(id,expense)),
    removeExpenseDispatch : (id) => dispatch(removeExpense(id))
})

const ConnectedEditExpensePage = connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

export default ConnectedEditExpensePage;