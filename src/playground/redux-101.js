import {createStore} from 'redux';

const store = createStore((state = {count:0}, action)=>{
    switch (action.type){
        case 'INCREMENT': 
            const isIncrementNumber = (typeof action.incrementBy === 'number');
            const isDecrementNumber = (typeof action.decrementBy === 'number');
            
            return{
                count: state.count +  isIncrementNumber ? action.incrementBy : 1
            };
        case 'DECREMENT':
            return{
                count: state.count - isDecrementNumber ? action.decrementBy : 1
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET' :
            return {
                count: action.count
            }
        default: 
            return state;
    };
});

const unsubscribe = store.subscribe((some)=>{

})

store.dispatch({
    type:'INCREMENT',
    incrementBy: 5
});

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 2
});

store.dispatch({
    type: 'SET',
    count: 101
});

console.log(store.getState());

