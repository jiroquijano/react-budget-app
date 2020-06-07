import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseList} from '../../components/ExpenseList';
import expenses from '../fixtures/expenses-fixtures';

test ("Should render ExpenseList with expenses", ()=>{
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    console.log(wrapper.shallow());
    expect(wrapper).toMatchSnapshot();
})