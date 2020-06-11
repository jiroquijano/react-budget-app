const getExpensesTotal = (expenses) =>{
    return expenses.reduce((total,expense) => {
        if(expense) return total + expense.amount;
    }, 0);
};

export default getExpensesTotal;