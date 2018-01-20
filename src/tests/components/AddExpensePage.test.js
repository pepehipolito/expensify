import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
  addExpenseSpy = jest.fn();
  historySpy    = { push: jest.fn() };
  wrapper       = shallow(<AddExpensePage startAddExpense={addExpenseSpy} history={historySpy} />);
});

test('renders AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test("sets the form action to 'Add'", () => {
  const action = wrapper.find('ExpenseForm').prop('action');
  expect(action).toBe('Add');
});

test('handles onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
  expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
});
