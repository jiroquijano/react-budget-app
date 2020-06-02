import React from 'react';
import {connect} from 'react-redux'
import {setTextFilter} from '../actions/filters';

const changeHandler = (e) =>{
    
};

const ExpenseListFilters = (props) =>(
    <div>
        <input type="text" onChange={(e)=>{
            console.log(props.dispatch(setTextFilter(e.target.value)));
        }} value={props.filters.text}/>
    </div>
);

const mapStateToProps = (state) => ({
    filters: state.filters
});

const ConnectedExpenseListFilters = connect(mapStateToProps)(ExpenseListFilters);

export default ConnectedExpenseListFilters;