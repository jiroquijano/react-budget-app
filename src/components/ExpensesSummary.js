import React from 'react';
import {connect} from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export class ExpensesSummary extends React.Component{
    render(){
        return (
            <div>
                <p>Viewing {this.props.expenseCount} expenses totalling {this.props.expensesTotal} </p>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const expenses = getVisibleExpenses(state);
    return {
        expenseCount : expenses.length,
        expensesTotal : getExpensesTotal(expenses)
    };
};

const ConnectedExpensesSummary = connect(mapStateToProps)(ExpensesSummary);
export default ConnectedExpensesSummary;