import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component{

    onSubmit = (expense) => {
        this.props.editExpenseDispatch(this.props.expense.id, expense);
        this.props.history.push("/");
    }

    onClick = () =>{
        this.props.removeExpenseDispatch(this.props.expense.id);
        this.props.history.push("/");
    }

    render(){ 
        return (<div>
                    Edit Expense Page for id: {this.props.expense.id}
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button onClick={this.onClick}>Remove</button>
                </div>);
    };
};

const mapStateToProps = (state,props) =>({
    expense: state.expenses.find((expense)=>expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) =>({
    editExpenseDispatch : (id, expense) => dispatch(editExpense(id,expense)),
    removeExpenseDispatch : (id) => dispatch(startRemoveExpense(id))
})

const ConnectedEditExpensePage = connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

export default ConnectedEditExpensePage;