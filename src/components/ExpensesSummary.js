import React from 'react';
import {connect} from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export class ExpensesSummary extends React.Component{
    render(){
        return (
            <div>
                <p>Viewing {this.props.expenseCount} {this.props.expenseCount > 1 ? 'expenses' : 'expense'} totalling {numeral(this.props.expensesTotal/100).format('$0,0.00')} </p>
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