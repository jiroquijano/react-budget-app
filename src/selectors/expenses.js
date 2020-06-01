export default getVisibleExpenses = ({expenses, filters})=>{
    const filteredExpenses = expenses.filter((expense)=>{
        const hasText = expense.description.toLowerCase().includes(filters.text.toLowerCase());
        const isWithinDate = (filters.startDate !== undefined || expense.createdAt >= filters.startDate) &&
            (filters.endDate !== undefined || expense.createdAt <= filters.endDate);
        return hasText && isWithinDate;
    });
    const sortBy = filters.sortBy === 'date' ? 'createdAt' : 'amount';
    return filteredExpenses.sort((expense1,expense2)=>{
            return expense1[sortBy] - expense2[sortBy];
        });
}