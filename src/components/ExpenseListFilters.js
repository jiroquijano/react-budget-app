import React from 'react';
import {connect} from 'react-redux'
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';

export class ExpenseListFilters extends React.Component{
    state = {
        calendarFocused : null
    };

    onDatesChange = ({startDate, endDate}) =>{
        this.props.setStartDateDispatch(startDate);
        this.props.setEndDateDispatch(endDate);
    };

    onFocusChange = (calendarFocused) =>{
        this.setState(()=>({
            calendarFocused
        }));
    };

    dispatchSetTextFilter = (event) => {
        this.props.setTextFilterDispatch(event.target.value);
    }

    sortByFilter = (event) => {
        event.target.value === 'date' ? this.props.sortByDateDispatch() : this.props.sortByAmountDispatch();
    }

    render(){
        return(
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                            className="text-input"
                            type="text"
                            value={this.props.filters.text}
                            onChange={this.dispatchSetTextFilter}
                            placeholder="Search expenses"
                        />
                    </div>

                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.sortByFilter}
                        >
                            <option value = "date">Date</option>
                            <option value = "amount">Amount</option>
                        </select>
                    </div>

                    <div className="input-group__item">
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
                </div> 
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) =>({
    setTextFilterDispatch : (filter)=> dispatch(setTextFilter(filter)),
    sortByDateDispatch : () => dispatch(sortByDate()),
    sortByAmountDispatch : () => dispatch(sortByAmount()),
    setStartDateDispatch : (startDate) => dispatch(setStartDate(startDate)),
    setEndDateDispatch : (endDate) => dispatch(setEndDate(endDate))
})

const ConnectedExpenseListFilters = connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilters);

export default ConnectedExpenseListFilters;