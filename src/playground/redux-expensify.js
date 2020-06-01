import {createStore, combineReducers} from 'redux';
import {v4 as uuidv4} from 'uuid';

//DEFAULT states of react store
const expenseReducerDefaultState = [];
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined,
};


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

//REMOVE_EXPENSE
const removeExpense = ({id}={}) =>({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILTER
const setTextFilter = (newTextFilter='') => ({
    type: 'SET_TEXT_FILTER',
    text: newTextFilter
});

//SORT_BY_DATE
const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});
//SORT_BY_AMOUNT
const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT'
})

//SET_START_DATE
const setStartDate = (date) =>({
    type: 'SET_START_DATE',
    startDate: date
});
//SET_END_DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    endDate: date
});

const expensesReducer = (state = expenseReducerDefaultState, action)=>{
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((curr)=>curr.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return {...expense, ...action.updates};
                }else{
                    return expense;
                }
            })
        default:
            return state;
    }
};

const filtersReducer = (state = filtersReducerDefaultState, action) =>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text};
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'};
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'};
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate};
        default:
            return state;
    };
};


// const demoState = {
//     expenses: [{
//         id: 'faweinaceoi',
//         description: 'My Condo Rents',
//         note: 'ang mahal',
//         amount: 21000,
//         createdAt: 0
//     }],
//     filters:{
//         text: 'rent',
//         sortBy: 'amount', //date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };

//Get visible expenses
const getVisibleExpenses = ({expenses, filters})=>{
    const filteredExpenses = expenses.filter((expense)=>{
        const hasText = expense.description.toLowerCase().includes(filters.text.toLowerCase());
        const isWithinDate = (filters.startDate !== undefined || expense.createdAt >= filters.startDate) &&
            (filters.endDate !== undefined || expense.createdAt <= filters.endDate);
        return hasText && isWithinDate;
    });
    const sortBy = filters.sortBy === 'date' ? 'createdAt' : 'amount';
    return filteredExpenses.sort((expense1,expense2)=>{
            return expense1[sortBy] - expense2[sortBy];
        });
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    console.log(getVisibleExpenses(store.getState()));
});

const firstExpense = store.dispatch(addExpense({
    description: 'Rent for this month',
    amount: 100,
    createdAt: 50
}));

const secondExpense = store.dispatch(addExpense({
    description: 'food for this month',
    amount: 10000,
    createdAt: 30
}));
//store.dispatch(removeExpense({id: firstExpense.expense.id}));
//store.dispatch(editExpense(firstExpense.expense.id, {amount: 500}));
store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
store.dispatch(setStartDate('10'));
store.dispatch(setEndDate('50'));
