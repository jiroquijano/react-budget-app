import moment from 'moment';

const getVisibleExpenses = ({expenses, filters})=>{
    const filteredExpenses = expenses.filter((expense)=>{
        const hasText = expense.description.toLowerCase().includes(filters.text.toLowerCase());
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = filters.startDate ? filters.startDate.isSameOrBefore(createdAtMoment, 'day'): true;
        const endDateMatch = filters.endDate ? filters.endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        return hasText && startDateMatch && endDateMatch;
    });
    const sortBy = filters.sortBy === 'date' ? 'createdAt' : 'amount';
    return filteredExpenses.sort((expense1,expense2)=>{
            return expense1[sortBy] - expense2[sortBy];
        });
}

export default getVisibleExpenses;