import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses-fixtures';

let wrapper,match, history, editExpenseDispatch, removeExpenseDispatch;

beforeEach(()=>{
    match = {params: {id: '1'}};
    history = {push: jest.fn()};
    editExpenseDispatch = jest.fn();
    removeExpenseDispatch = jest.fn();
    wrapper = shallow(
                <EditExpensePage 
                    expense={expenses[0]}
                    match={match}
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
    wrapper.find('button').prop('onClick')();
    expect(removeExpenseDispatch).toHaveBeenLastCalledWith(match.params.id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

