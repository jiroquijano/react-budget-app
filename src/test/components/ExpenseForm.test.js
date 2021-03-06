import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses-fixtures';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

test ("should render expense form", ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test ("should render ExpenseForm with data", ()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test ("should render error for invalid form submission", ()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); //multiple snapshots can be used for each test case
    wrapper.find('form').simulate('submit',{
        preventDefault: ()=>{}
    });
    expect(wrapper.state('error')).toBe('description and amount should not be empty!');
    expect(wrapper).toMatchSnapshot();
});

test ("should set description on input change", ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(0).simulate('change',{
        target : {
            value:'new'
        }
    }); //at specifies the index of the element if find returns multiple
    expect(wrapper.state('description')).toBe('new');
});

test ("should set note on note change", ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('textarea').simulate('change',{
        target:{value:'new note'}
    });
    expect(wrapper.state('note')).toBe('new note');
});

test ("should set amount if input is valid", ()=>{
    const validAmount = '23.50';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change',{
        target:{
            value: validAmount
        }
    });
    expect(wrapper.state('amount')).toBe(validAmount);
});

test ("should not set amount if input is invalid", ()=>{
    const invalidAmount = '12.122'
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: invalidAmount
        }
    })
    expect(wrapper.state('amount')).toBe('');
});

test("should call onSubmit prop for valid form submission", ()=>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault: ()=>{}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:expenses[0].description,
        amount:expenses[0].amount,
        createdAt:expenses[0].createdAt,
        note:expenses[0].note
    });
});

test ("should set new date on date change",()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onDateChange')(moment());
    expect(wrapper.state('createdAt')).toEqual(now);
});

test ("should set calendar focus on change", ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({focused:true});
    expect(wrapper.state('calendarFocused')).toBe(true);
});