const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state, action.expense
      ]
    case 'REMOVE_EXPENSE':
      // Here we are destructuring the expense element to obtain the id value in the argument to 'filter'.
      return state.filter(({id}) => (id !== action.id ));
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {...expense, ...action.payload};
        } else {
          return expense;
        }
      });
    case 'SET_EXPENSES':
      return action.expenses;
    default:  // This gets called when setting up the store, so we need a default 'state' parameter value.
      return state;
  }
};
