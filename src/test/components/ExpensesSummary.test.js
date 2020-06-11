import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses-fixtures';
import getExpensesTotal from '../../selectors/expenses-total';

test ("Should render multiple expenses summary properly",()=>{
    const wrapper = shallow(<ExpensesSummary 
            expenseCount={expenses.length}
            expensesTotal={getExpensesTotal(expenses)}
        />)
    expect(wrapper).toMatchSnapshot();
});

test ("Should render single expense summary properly", ()=>{
    const wrapper = shallow(<ExpensesSummary
            expenseCount={1}
            expensesTotal = {getExpensesTotal([expenses[0]])}
        />)
    expect(wrapper).toMatchSnapshot();
});