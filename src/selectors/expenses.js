const getVisibleExpenses = ({expenses, filters})=>{
    const filteredExpenses = expenses.filter((expense)=>{
        const hasText = expense.description.toLowerCase().includes(filters.text.toLowerCase());
        const isWithinDate = (typeof filters.startDate !== 'number' || expense.createdAt >= filters.startDate) &&
            (typeof filters.endDate !== 'number' || expense.createdAt <= filters.endDate);
        return hasText && isWithinDate;
    });
    const sortBy = filters.sortBy === 'date' ? 'createdAt' : 'amount';
    return filteredExpenses.sort((expense1,expense2)=>{
            return expense1[sortBy] - expense2[sortBy];
        });
}

export default getVisibleExpenses;