import React from 'react';
import {connect} from 'react-redux'
import {setTextFilter, sortByDate, sortByAmount} from '../actions/filters';

const ExpenseListFilters = (props) =>(
    <div>
        <input type="text" onChange={(e)=>{
            props.dispatch(setTextFilter(e.target.value));
        }} value={props.filters.text}/>
        <select
            value={props.filters.sortBy}
            onChange={(e)=>{
                const action = e.target.value === 'date' ? sortByDate : sortByAmount;
                props.dispatch(action());
            }}>
                <option value = "date">Date</option>
                <option value = "amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => ({
    filters: state.filters
});

const ConnectedExpenseListFilters = connect(mapStateToProps)(ExpenseListFilters);

export default ConnectedExpenseListFilters;