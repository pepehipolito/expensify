import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('renders correctly with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('renders correctly with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={1023} />);
  expect(wrapper).toMatchSnapshot();
});

test('renders correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={10593600} />);
  expect(wrapper).toMatchSnapshot();
});
