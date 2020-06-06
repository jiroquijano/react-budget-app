import filtersReducer from '../../reducers/filters';
import moment from 'moment';

const defaultFiltersState = {
    text:'',
    sortBy:'date',
    startDate:moment().startOf('month'),
    endDate:moment().endOf('month')
};

test ("should setup default filter values",()=>{
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual(defaultFiltersState);
});

test ("should be able to set sortBy to 'amount'", ()=>{
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state).toEqual({...defaultFiltersState, sortBy:'amount'});
});

test ("should be able to set sortBy to 'date'", ()=>{
    const state = filtersReducer({...defaultFiltersState, sortBy:'amount'}, {type: 'SORT_BY_DATE'});
    expect(state).toEqual({...defaultFiltersState, sortBy:'date'});
});

test ("should be able to set startDate", ()=>{
    const startDate = moment();
    const state = filtersReducer({...defaultFiltersState}, {type: 'SET_START_DATE',startDate});
    expect(state).toEqual({...defaultFiltersState, startDate});
})

test ("should be able to set endDate", ()=>{
    const endDate = moment();
    const state = filtersReducer({...defaultFiltersState},{type: 'SET_END_DATE', endDate})
    expect(state).toEqual({...defaultFiltersState,endDate});
});

test ("should be able to set text filter", ()=>{
    const text = 'test';
    const state = filtersReducer({...defaultFiltersState},{type:'SET_TEXT_FILTER',text});
    expect(state).toEqual({...defaultFiltersState,text});
});