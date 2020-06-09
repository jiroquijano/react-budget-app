import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses-fixtures';

let wrapper, history, editExpenseDispatch, removeExpenseDispatch;

beforeEach(()=>{
    history = {push: jest.fn()};
    editExpenseDispatch = jest.fn();
    removeExpenseDispatch = jest.fn();
    wrapper = shallow(
                <EditExpensePage 
                    expense={expenses[0]}
                    history={history}
                    removeExpenseDispatch={removeExpenseDispatch}
                    editExpenseDispatch={editExpenseDispatch}
                />
            );
});

test ("should render EditExpensePage properly", ()=>{
    expect(wrapper).toMatchSnapshot();
});

test ("should trigger edit expense dispatch on submit", ()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(editExpenseDispatch).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test ("should trigger remove expense dispatch on click", ()=>{
    wrapper.find('button').simulate('click');
    expect(removeExpenseDispatch).toHaveBeenLastCalledWith(expenses[0].id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

