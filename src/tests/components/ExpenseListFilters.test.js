import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defaultFilters, populatedFilters} from '../fixtures/filters';
import moment from 'moment';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
  setStartDate  = jest.fn();
  setEndDate    = jest.fn();
  setTextFilter = jest.fn();
  sortByDate    = jest.fn();
  sortByAmount  = jest.fn();
  wrapper       = shallow(
    <ExpenseListFilters
      filters={defaultFilters}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
    />
  );
});

test('renders ExpenseListFilters with default filters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('renders ExpenseListFilters with populated filters correctly', () => {
  wrapper.setProps({filters: populatedFilters});
  expect(wrapper).toMatchSnapshot();
});

test('handles date changes', () => {
  wrapper.setProps({filters: populatedFilters});
  const startDate = moment(0).add(4, 'years');
  const endDate   = moment(0).add(8, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('handles date focus changes', () => {
  expect(wrapper.state('calendarFocus')).toBe(null);
  const focusField = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(focusField);
  expect(wrapper.state('calendarFocus')).toBe(focusField);
});

test('handles text changes', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {target: {value}});
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('sorts by date', () => {
  // We change props so the select value is not 'date' to start with.
  wrapper.setProps({filters: populatedFilters});
  wrapper.find('select').simulate('change', {target: {value: 'date'}});
  expect(sortByDate).toHaveBeenCalled();
});

test('sorts by amount', () => {
  // We do not change props so the select value is not 'amount' to start with.
  wrapper.find('select').simulate('change', {target: {value: 'amount'}})
  expect(sortByAmount).toHaveBeenCalled();
});
