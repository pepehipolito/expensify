import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Action generators:
// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSE
const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, payload) => ({
  type: 'EDIT_EXPENSE',
  id,
  payload
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// Reducers:
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
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
    default:  // This gets called when setting up the store, so we need a default 'state' parameter value.
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:  // This gets called when setting up the store, so we need a default 'state' parameter value.
      return state;
  }
};

const spanishLeagueReducer = (state = {name: 'La Liga'}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const bulgarianLeagueReducer = (state = {name: 'Gorilla World'}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter(({description, createdAt}) => (
    // If no text filtering set (text.length === 0) we accept all texts.
    // If no startDate/endDate filtering set we accept all dates.
    (text.length === 0 || description.toLowerCase().includes(text.toLowerCase())) &&
    (typeof startDate  !== 'number' || createdAt >= startDate)                    &&
    (typeof endDate    !== 'number' || createdAt <= endDate)
  )).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return a.createdAt <= b.createdAt ? 1 : -1;
      case 'amount':
        return a.amount <= b.amount ? 1 : -1;
      default:
        return a;
    }
  });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
    leagues: combineReducers({
      spanish: spanishLeagueReducer,
      bulgarian: bulgarianLeagueReducer
    })
  })
);

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('filters', state.filters);
  console.log('all expenses', state.expenses);
  console.log('visibleExpenses', visibleExpenses);
});

const expenseOne    = store.dispatch(addExpense());
const expenseTwo    = store.dispatch(addExpense({description: 'rent', amount: 150000}));
const expenseThree  = store.dispatch(addExpense({description: 'Coffee', note: 'Starbucks', amount: 350}));

console.log('one', expenseOne)
console.log('two', expenseTwo)
console.log('three', expenseThree)

const removedExpense = store.dispatch(removeExpense(expenseTwo.expense.id));

console.log('removedExpense', removedExpense)

const editedExpense = store.dispatch(editExpense(expenseThree.expense.id, {amount: 500, createdAt: 225}))

console.log('editedExpense', editedExpense)

const rentTextFilter  = store.dispatch(setTextFilter('rent'));
const noTextFilter    = store.dispatch(setTextFilter());

console.log('rentTextFilter', rentTextFilter)
console.log('noTextFilter', noTextFilter)

const sortedByAmount  = store.dispatch(sortByAmount());
const sortedByDate    = store.dispatch(sortByDate());

console.log('sortedByAmount', sortedByAmount)
console.log('sortedByDate', sortedByDate)

const startDate125        = store.dispatch(setStartDate(125));
// const startDateUndefined  = store.dispatch(setStartDate());

console.log('startDate125', startDate125)
// console.log('startDateUndefined', startDateUndefined)

const endDate125        = store.dispatch(setEndDate(1250));
// const endDateUndefined  = store.dispatch(setEndDate());

console.log('endDate125', endDate125)
// console.log('endDateUndefined', endDateUndefined)

unsubscribe();

// const demoState = {
//   expenses: [
//     {
//       id: 0,
//       description: 'January rent',
//       note: 'This was the final payment for that address',
//       amount: 54500,
//       createdAt: 0
//     }
//   ],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount', // date or amount
//     startDate: undefined,
//     endDate: undefined
//   }
// };
