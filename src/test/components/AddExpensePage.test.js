import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses-fixtures';

let addExpense, history, wrapper;

beforeEach(()=>{
    addExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<AddExpensePage addExpenseDispatch={addExpense} history={history}/>);
})

test ("should render AddExpensePage correctly",()=>{
    expect(wrapper).toMatchSnapshot();
});

test ("should handle onSubmit", ()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(addExpense).toHaveBeenLastCalledWith(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});