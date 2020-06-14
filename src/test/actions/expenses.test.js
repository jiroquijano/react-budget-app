import {addExpense, removeExpense, editExpense, startAddExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses-fixtures';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(()=>{
    database.ref().remove();
})

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
        console.log(actions[0]);
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

// test ("Empty addExpense generator should generate add action with defaults", ()=>{
//     const defaultAddAction = {
//         description: '',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     }
//     const addAction = addExpense();
//     expect(addAction).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             ...defaultAddAction
//         }
//     });
// });

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
})