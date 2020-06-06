import expensesReducer from '../../reducers/expenses';
import moment from 'moment';
import expensesFixture from '../fixtures/expenses-fixtures';

test ("should return default state", ()=>{
    const state = expensesReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
});

test ("should be able to add expense",()=>{
    const expense = {
        id:'4',
        description : 'new expense',
        note:'',
        amount:50,
        createdAt: moment()
    }
    const state = expensesReducer(expensesFixture,{type:'ADD_EXPENSE',expense});
    expect(state).toEqual([...expensesFixture, expense]);
});

test ("should be able to remove expense",()=>{
    const state = expensesReducer(expensesFixture,{type: 'REMOVE_EXPENSE', id: '1'});
    expect(state).toEqual(expensesFixture.slice(1));
});

test ("should not be able to delete non-existing expense id", ()=>{
    const state = expensesReducer(expensesFixture,{type:'REMOVE_EXPENSE',id:'5'});
    expect(state).toEqual(expensesFixture);
});

test ("should be able to edit existing expense", ()=>{
    const updates = {
        description: 'updated expense',
        amount: 100
    };
    const state = expensesReducer(expensesFixture, {type:'EDIT_EXPENSE',id: '1', updates})
    expect(state).toEqual([{...state[0], ...updates}, ...expensesFixture.slice(1)]);
});