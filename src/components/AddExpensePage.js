import React from 'react';
import ExpenseForm from './ExpenseForm';
import {connect} from 'react-redux';
import {startAddExpense} from '../actions/expenses';

export class AddExpensePage extends React.Component{
    onSubmit = (expense) =>{
        this.props.addExpenseDispatch(expense);
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Expense page</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    };
}

// const AddExpensePage = (props) =>(
//     <div>
//         <h1>Expense page</h1>
//         <ExpenseForm onSubmit={(expense)=>{
//             //props.dispatch(addExpense(expense)); 
//             props.onSubmit(expense); //thanks to mapDispatchToProps from react-redux
//             props.history.push("/");
//         }}/>
//     </div>
// );

const mapDispatchToProps = (dispatch)=>({
        addExpenseDispatch: (expense) => dispatch(startAddExpense(expense))
});

const ConnectedAddExpensePage = connect(undefined,mapDispatchToProps)(AddExpensePage);

export default ConnectedAddExpensePage;