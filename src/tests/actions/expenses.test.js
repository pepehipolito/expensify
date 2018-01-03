import {addExpense, removeExpense, editExpense} from '../../actions/expenses';

test('it creates an expense action object with passed values', () => {
  const expenseData = {
    description: 'coffee',
    note: 'my note',
    amount: 15.03,
    createdAt: 1000
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('it creates an expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});

test('it removes an expense action object', () => {
  const id = '123abc';
  const action = removeExpense('123abc');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });
});

test('it edits an expense action object', () => {
  const id      = '123abc';
  const payload = {
    description: 'a description',
    note: 'a note',
    amount: 0,
    createdAt: 0
  };
  const action = editExpense(id, payload);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    payload
  });
});
