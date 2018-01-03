import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import ExpenseForm from '../../components/ExpenseForm';
import moment from 'moment';

test('renders ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('renders ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('renders error with invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  //NOTE: We take a snapshot before the form submission simulation.
  expect(wrapper).toMatchSnapshot();
  //NOTE: This line is going to simulate the form submission and should update the state 'error' value.
  wrapper.find('form').simulate('submit', {preventDefault: () => {}});
  //NOTE: Now we can check on the state of the component. The state 'error' value should not be empty.
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  //NOTE: We take another snapshot after the form is submitted.
  expect(wrapper).toMatchSnapshot();
});

test('sets description on input change', () => {
  const value = 'foobar';
  const wrapper = shallow(<ExpenseForm />);
  // We are going to make sure that the form changes and there are 2 versions: before and after. This is optional, though.
  expect(wrapper).toMatchSnapshot();
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('sets note on textarea change', () => {
  const value = 'foobar';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('sets amount if valid input', () => {
  const value = '25.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('does not set amount with invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
  // We could also have used 'not':
  // expect(wrapper.state('amount')).not.toBe(value);
});

//NOTE: This test uses a spy. Spys create fake funtions that replace real ones.
test('calls onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {preventDefault: () => {}});
  expect(wrapper.state('error')).toBe('');
  const expenseWithoutId = Object.assign({}, expenses[0]);
  delete expenseWithoutId.id;
  expect(onSubmitSpy).toHaveBeenCalledWith(expenseWithoutId);
});

test('sets new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('sets calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state('calendarFocused')).toBe(false);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(true);
});
