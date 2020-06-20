import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense,startRemoveExpense} from '../actions/expenses';

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
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Edit Expense Page for id: <span>{this.props.expense.id}</span>
                        </h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onClick}>Remove Expense</button>
                </div>
            </div>);
    };
};

const mapStateToProps = (state,props) =>({
    expense: state.expenses.find((expense)=>expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) =>({
    editExpenseDispatch : (id, expense) => dispatch(startEditExpense(id,expense)),
    removeExpenseDispatch : (id) => dispatch(startRemoveExpense(id))
})

const ConnectedEditExpensePage = connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

export default ConnectedEditExpensePage;