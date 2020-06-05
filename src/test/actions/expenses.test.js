import {addExpense, removeExpense, editExpense} from '../../actions/expenses';


test ("Not empty addExpense generator should generate add action", ()=>{
    const newExpense = {
        description: 'new',
        note: 'i am new',
        amount : 10,
        createdAt : 1000
    };
    const addAction = addExpense(newExpense);
    expect(addAction).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...newExpense
        }
    });
});

test ("Empty addExpense generator should generate add action with defaults", ()=>{
    const defaultAddAction = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    const addAction = addExpense();
    expect(addAction).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...defaultAddAction
        }
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
})