import expensesReducer from '../../reducers/expenses';
import moment from 'moment';

test ("should return default state", ()=>{
    const state = expensesReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
});

test ("should be able to add expense",()=>{
    const expense = {
        description : 'new expense',
        note:'',
        amount:50,
        createdAt: moment()
    }
    const state = expensesReducer(undefined,{type:'ADD_EXPENSE',expense});
    expect(state).toEqual([expense]);
});

test ("should be able to remove expense",()=>{
    const currentState = [{
        id: '1',
        description : 'new expense',
        note:'',
        amount:50,
        createdAt: moment()
    }];
    const state = expensesReducer(currentState,{type: 'REMOVE_EXPENSE', id: '1'});
    expect(state).toEqual([]);
});

test ("should not be able to delete non-existing expense id", ()=>{
    const currentState = [{
        id: '1',
        description : 'new expense',
        note:'',
        amount:50,
        createdAt: moment()
    }];
    const state = expensesReducer(currentState,{type:'REMOVE_EXPENSE',id:'2'});
    expect(state).toEqual(currentState);
});

test ("should be able to edit existing expense", ()=>{
    const existingItem = {
        id: '1',
        description : 'new expense',
        note:'',
        amount:50,
        createdAt: moment()
    };
    const currentState = [existingItem];
    const updates = {
        description: 'updated expense',
        amount: 100
    };
    const state = expensesReducer(currentState, {type:'EDIT_EXPENSE',id: '1', updates})
    expect(state).toEqual([{...existingItem, ...updates}]);
});