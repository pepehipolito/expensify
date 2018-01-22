import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = {description, note, amount, createdAt};

    // We need to return the promise so we can test it. This requires us to have a connection to the
    // DB for testing, though. If that is not available the tests will fail.
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  }
}

// REMOVE_EXPENSE
export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = (id) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then((res) => {
      dispatch(removeExpense(id));
    });
  }
};

// EDIT_EXPENSE
export const editExpense = (id, payload) => ({
  type: 'EDIT_EXPENSE',
  id,
  payload
});

export const startEditExpense = (id, payload) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).set(payload).then((res) => {
      dispatch(editExpense(id, payload));
    });
  }
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// export const startSetExpenses;
export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then(snapshot => {
      const expenses = [];

      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      });

      dispatch(setExpenses(expenses));
    });
  }
}
