import React from 'react';
import {connect} from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

export class ExpensesSummary extends React.Component{
    render(){
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Viewing <span>{this.props.expenseCount}</span> {this.props.expenseCount > 1 ? 'expenses' : 'expense'} totalling <span>{numeral(this.props.expensesTotal/100).format('$0,0.00')}</span> </h1>
                    <div className="page-header__actions">
                        <Link className="button" to='/create'>Add Expense</Link>
                    </div>
                </div>
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