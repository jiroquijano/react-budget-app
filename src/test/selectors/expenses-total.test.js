import expenses from '../fixtures/expenses-fixtures';
import getExpensesTotal from '../../selectors/expenses-total.js';

test ("should sum all of the expense amount correctly", ()=>{
    const total = getExpensesTotal(expenses);
    expect(total).toBe(114195);
});

test ("should return zero if expenses array is empty", ()=>{
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
})

test ("should correctly add up a single expense", ()=>{
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toBe(195);
})