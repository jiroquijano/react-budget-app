import {
    addExpense,
    removeExpense,
    editExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses-fixtures';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database, {firebase} from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'testuid'
const defaultAuth = {auth:{uid}}

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
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>{
        done();
    });
});

test ("should add expense to database and store", (done)=>{
    const store = createMockStore(defaultAuth);
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
        const databasePromise = database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        databasePromise.then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
        
    });
});

test ("should add expense with defaults to database and store", (done)=>{
    const store = createMockStore(defaultAuth);
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
    const store = createMockStore(defaultAuth);
    const dispatchPromise =  store.dispatch(startSetExpenses());
    dispatchPromise.then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: [...expenses]
        });
        done();
    });
});

test ("should be able to dispatch remove action",(done)=>{
    const idToRemove = 2;
    const store = createMockStore({...defaultAuth,expenses});
    store.dispatch(startRemoveExpense(idToRemove)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: idToRemove
        });
        done();
    });    
});

test ("should be able to remove expense from firebase", (done)=>{
    const store = createMockStore({...defaultAuth,expenses});
    store.dispatch(startRemoveExpense(2)).then(()=>{
        database.ref(`users/${uid}/expenses/2`).once('value').then((snapshot)=>{
            expect(snapshot.val()).toBe(null);
            done();
        });
    });
});

test ("should edit expense from firebase", (done)=>{
    const updates = {
        description: 'Bubble Gum'
    };
    const {amount, createdAt, description, note} = expenses[0];
    const store = createMockStore({...defaultAuth,expenses});
    store.dispatch(startEditExpense(expenses[0].id, updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenses[0].id,
            updates
        });
        database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value').then((snapshot)=>{
            expect(snapshot.val()).toEqual({
                amount,
                createdAt,
                description,
                note,
                ...updates
            });
            done();
        });
    });
})