import {addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses-fixtures';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database, {firebase} from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = {
            description,
            note,
            amount,
            createdAt
        }
    });
    database.ref('expenses').set(expensesData).then(()=>{
        done();
    });
});

test ("should add expense to database and store", (done)=>{
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: "new one",
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        const databasePromise = database.ref(`expenses/${actions[0].expense.id}`).once('value');
        databasePromise.then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
        
    });
});

test ("should add expense with defaults to database and store", (done)=>{
    const store = createMockStore({});
    store.dispatch(startAddExpense()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createdAt: 0
            }
        });
        done();
    })
});

test ("Not empty addExpense generator should generate add action", ()=>{
    const addAction = addExpense(expenses[0]);
    expect(addAction).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test ("removeExpense generator should generate remove action", ()=>{
    const removeAction = removeExpense('123');
    expect(removeAction).toMatchObject({
        type: 'REMOVE_EXPENSE',
        id: '123'
    });
});

test ("editExpense generator should generate edit action", ()=>{
    const updates = {
        description : 'edited',
        note: 'edited',
        amount: 100,
        createdAt : 10000
    }
    const editAction = editExpense('123',updates);
    expect(editAction).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates
    })
});

test ("should setup setExpense action object with data", ()=>{
    const result =  setExpenses(expenses);
    expect(result).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test ("should fetch data from database and set the expenses", (done)=>{
    const store = createMockStore({});
    const dispatchPromise =  store.dispatch(startSetExpenses());
    dispatchPromise.then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: [...expenses]
        });
        done();
    });
})