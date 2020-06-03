import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends React.Component{
    state = {
        description: '',
        note: '',
        amount: '',
        createdAt: moment(),
        calendarFocused: false,
        error: ''
    };

    onDescriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(()=>({
            description
        }));
    };

    onNoteChange = (e) =>{
        const note = e.target.value;
        this.setState(()=>({
            note
        }));
    };

    onAmountChange = (e) =>{
        const amount = e.target.value;
        if(!amount || amount.match(/^\d*(\.\d{0,2})?$/)){
            this.setState(()=>({
                amount
            }));
        };
    };

    onDateChange = (createdAt) =>{
        if (createdAt){
            this.setState(()=>({
                createdAt
            }));
        }
    };

    onFocusChange = ({focused}) =>{
        this.setState(()=>({
            calendarFocused: focused
        }));
    };

    onSubmit = (e)=>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({
                error: 'description and amount should not be empty!'
            }))
        }else{
            this.setState(()=>({
                error: ''
            }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
            console.log('submitted');
        }
    };

    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        name="description"
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        name="amount"
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <br/>
                    <textarea
                        value={this.state.note}
                        onChange={this.onNoteChange}
                        placeholder="Add a note for your expense"
                    />
                    <SingleDatePicker
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        id="picker"
                        numberOfMonths = {1}
                        isOutsideRange = {(day)=>false}
                    />
                    <button>Add Expense</button>
                </form>
            </div>
        );
    };
};

export default ExpenseForm;