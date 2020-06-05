import React from 'react';
import {connect} from 'react-redux'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';

class ExpenseListFilters extends React.Component{
    state = {
        calendarFocused : null
    };

    onDatesChange = ({startDate, endDate}) =>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (calendarFocused) =>{
        this.setState(()=>({
            calendarFocused
        }));
    };

    render(){
        return(
            <div> 
                <input 
                    type="text"
                    value={this.props.filters.text}
                    onChange={(e)=>{
                        this.props.dispatch(setTextFilter(e.target.value))
                    }}
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={(e)=>{
                        const action = e.target.value === 'date' ? sortByDate : sortByAmount;
                        this.props.dispatch(action());
                    }}>
                    <option value = "date">Date</option>
                    <option value = "amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate = {this.props.filters.startDate}
                    startDateId = "startdate"
                    endDate = {this.props.filters.endDate}
                    endDateId= "enddate"
                    onDatesChange = {this.onDatesChange}
                    focusedInput = {this.state.calendarFocused}
                    onFocusChange = {this.onFocusChange}
                    showClearDates = {true}
                    numberOfMonths = {1}
                    isOutsideRange = {()=>false}
                />
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const ConnectedExpenseListFilters = connect(mapStateToProps)(ExpenseListFilters);

export default ConnectedExpenseListFilters;