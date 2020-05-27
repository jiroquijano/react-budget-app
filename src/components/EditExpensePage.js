import React from 'react';

const EditExpensePage = (props) =>{
    console.log(props.match.params);
    console.log(props);
    return (<div>
        Edit Expense Page for id: {props.match.params.id}
    </div>);
};

export default EditExpensePage;