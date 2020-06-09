import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters-fixture';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';

let wrapper, setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy;

beforeEach(()=>{
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilterDispatch = {setTextFilterSpy}
            sortByDateDispatch = {sortByDateSpy}
            sortByAmountDispatch = {sortByAmountSpy}
            setStartDateDispatch = {setStartDateSpy}
            setEndDateDispatch = {setEndDateSpy}
        />);
});

test ("should render expense list filters properly", ()=>{
   expect(wrapper).toMatchSnapshot();
});

test ("should render expense list filters with altdata properly", ()=>{
    wrapper.setProps({filters: altFilters});
    expect(wrapper).toMatchSnapshot();
 });

test ("should handle text filter change", ()=>{
    const newTextFilter = 'new text filter'
    wrapper.find('input').prop('onChange')({
        target:{
            value:newTextFilter
        }
    });
    expect(setTextFilterSpy).toHaveBeenLastCalledWith(newTextFilter);
 });

test ("should sort by date", ()=>{
wrapper.find('select').prop('onChange')({
        target:{
            value:'date'
        }
    });
expect(sortByDateSpy).toHaveBeenCalled();
});

test ("should sort by amount", ()=>{
    wrapper.find('select').prop('onChange')({
        target:{
            value: 'amount'
        }
    });
    expect(sortByAmountSpy).toHaveBeenCalled();
});

test ("should handle date changes", ()=>{
    const startDate = moment(0);
    const endDate = moment(0).add(3,"days");
    wrapper.find(DateRangePicker).prop('onDatesChange')({startDate, endDate});
    expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
    expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test ("should handle focus changes", ()=>{
    wrapper.find(DateRangePicker).prop('onFocusChange')('startDate');
    expect(wrapper.state('calendarFocused')).toBe('startDate');
});