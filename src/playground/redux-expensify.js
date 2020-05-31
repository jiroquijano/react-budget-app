import {createStore, combineReducers} from 'redux';
import {v4 as uuidv4} from 'uuid';

//ADD_EXPENSE
const addExpense = ({
        description = '',
        note='',
        amount=0,
        createdAt = 0
        }={}
    ) =>({
        type: 'ADD_EXPENSE',
        expense:{
            id: uuidv4(),
            description,
            note,
            amount,
            createdAt
        }
});

const removeExpense = ({id}={}) =>({
    type: 'REMOVE_EXPENSE',
    id
});

//REMOVE_EXPENSE
//EDIT_EXPENSE
//SET_TEXT_FILTER
//SORT_BY_DATE
//SORT_BY_AMOUNT
//SET_START_DATE
//SET_END_DATE
const expenseReducerDefaultState = [];
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined,
};

const expensesReducer = (state = expenseReducerDefaultState, action)=>{
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((curr)=>curr.id !== action.id);
        default:
            return state;
    }
};

const filtersReducer = (state = filtersReducerDefaultState, action) =>{
    switch(action.type){
        default:
            return state;
    };
};


const demoState = {
    expenses: [{
        id: 'faweinaceoi',
        description: 'My Condo Rents',
        note: 'ang mahal',
        amount: 21000,
        createdAt: 0
    }],
    filters:{
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};


const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    console.log(store.getState());
});

const firstExpense = store.dispatch(addExpense({
    description: 'Rent',
    amount: 100
}));

store.dispatch(addExpense({
    description: 'test',
    amount: 10000
}));

store.dispatch(removeExpense({id: firstExpense.expense.id}));

//console.log(store.getState());