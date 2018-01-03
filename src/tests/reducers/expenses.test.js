import reduceExpenses from '../../reducers/expenses';

test('sets up default expense values', () => {
  const state = reduceExpenses(undefined, '@@INIT');
  expect(state).toEqual([]);
});

test('does not change state with unknown action', () => {
  const initialState = [{foo: 'bar'}];
  const state = reduceExpenses(initialState, {type: 'UNKNOWN'});
  expect(state).toEqual(initialState);
});

test('adds an expense', () => {
  const expense = {foo: 'bar'};
  const state = reduceExpenses([], {type: 'ADD_EXPENSE', expense});
  expect(state).toEqual([expense]);
});

test('removes an expense', () => {
  const expense = {id: 'foobar'};
  const state = reduceExpenses([expense], {type: 'REMOVE_EXPENSE', id: expense.id});
  expect(state).toEqual([]);
});

test('updates an expense if found', () => {
  const expenses = [{id: 'foo', age: 25}, {id: 'bar', city: 'Oldsmar'}];
  const state = reduceExpenses(expenses, {type: 'EDIT_EXPENSE', id: expenses[0].id, payload: {age: 52}});
  expect(state).toEqual([{id: 'foo', age: 52}, {id: 'bar', city: 'Oldsmar'}]);
});

test('does not update any expenses if none found', () => {
  const expenses = [{id: 'foo', age: 25}, {id: 'bar', city: 'Oldsmar'}];
  const state = reduceExpenses(expenses, {type: 'EDIT_EXPENSE', id: 'baz', payload: {age: 52}});
  expect(state).toEqual(expenses);
});
