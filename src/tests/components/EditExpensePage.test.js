import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, editExpenseSpy, removeExpenseSpy, historySpy, wrapper;

beforeEach(() => {
  expense           = expenses[2];
  editExpenseSpy    = jest.fn();
  removeExpenseSpy  = jest.fn();
  historySpy        = { push: jest.fn() };
  wrapper           = shallow(
                        <EditExpensePage
                          expense={expense}
                          editExpense={editExpenseSpy}
                          startRemoveExpense={removeExpenseSpy}
                          history={historySpy}
                        />
                      );
});

test('renders EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test("sets the form action to 'Update'", () => {
  const action = wrapper.find('ExpenseForm').prop('action');
  expect(action).toBe('Update');
});

test('handles editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id, expense);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});

test('handles removeExpense', () => {
  wrapper.find('ExpenseForm').prop('onRemove')();
  expect(removeExpenseSpy).toHaveBeenLastCalledWith(expense.id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
});
