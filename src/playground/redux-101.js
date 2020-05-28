import {createStore} from 'redux';

const incrementCount = ({incrementBy = 1}={})=>({
    type:'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) =>({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = ()=>({
    type: 'RESET'
});

const setCount = ({count = 0}={})=>({
    type: 'SET',
    count : typeof count === 'number' ? count : 0
});

const store = createStore((state = {count:0}, action)=>{
    switch (action.type){
        case 'INCREMENT': 
            return{
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            }
        case 'SET' :
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default: 
            return state;
    };
});

const unsubscribe = store.subscribe((some)=>{

})

store.dispatch(incrementCount({incrementBy: 10}));
store.dispatch(decrementCount({decrementBy: 5}));
store.dispatch(setCount({count:100}));
store.dispatch(resetCount());
console.log(store.getState());


