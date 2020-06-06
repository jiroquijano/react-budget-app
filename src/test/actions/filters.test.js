import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../../actions/filters';
import moment from 'moment';

test ("should generate sortByAmount action object", ()=>{
    const sortByAmountAction = sortByAmount();
    expect(sortByAmountAction).toEqual({type: 'SORT_BY_AMOUNT'});
});

test ("should generate sortByDate action object", ()=>{
    const sortByDateAction = sortByDate();
    expect(sortByDateAction).toEqual({type: 'SORT_BY_DATE'});
});

test ("should generate a not empty setTextFilter action object",()=>{
    const newTextFilter = 'test';
    const setTextFilterAction = setTextFilter(newTextFilter);
    expect(setTextFilterAction).toEqual({
        type: 'SET_TEXT_FILTER',
        text: newTextFilter
    })
});

test ("should generate a default setTextFilter action object", ()=>{
    const setTextFilterAction = setTextFilter();
    expect(setTextFilterAction).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test ("Should generate setStartDate action object", ()=>{
    const now = moment();
    const startDateAction = setStartDate(now);
    expect(startDateAction).toEqual({
        type: 'SET_START_DATE',
        startDate: now
    });
});

test ("should generate set end date action object", ()=>{
    const now = moment();
    const endDateAction = setEndDate(now);
    expect(endDateAction).toEqual({
        type: 'SET_END_DATE',
        endDate: now
    });
});