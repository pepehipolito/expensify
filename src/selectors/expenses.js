import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    // If no startDate/endDate filtering set we accept all dates.
    const startDateMatch  = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day')  : true;
    const endDateMatch    = endDate   ? endDate.isSameOrAfter(createdAtMoment, 'day')     : true;
    // If no text filtering set (text.length === 0) we accept all texts.
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return a.createdAt < b.createdAt ? 1 : -1;
      case 'amount':
        return a.amount < b.amount ? 1 : -1;
      default:
        return a;
    }
  });
};
