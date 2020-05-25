import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './styles/styles.scss';
import 'normalize.css/normalize.css';

const ExpenseDashboardPage = ()=>(
    <div>
        This is from the jiro's dashboard component
    </div>
);

const AddExpensePage = ()=>(
    <div>
        expense page
    </div>
);

const EditExpensePage = ()=>(
    <div>
        Edit Expense Page
    </div>
);

const HelpPage = (props) =>(
    <div>
        Help Me
    </div>
);

const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" exact={true} component={ExpenseDashboardPage}/>
            <Route path="/expense" component={AddExpensePage}/>
            <Route path="/edit" component={EditExpensePage}/>
            <Route path="/help" component={HelpPage}/> 
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes,document.querySelector('#app'));