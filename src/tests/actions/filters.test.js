import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../../actions/filters';
import moment from 'moment';

test('it creates a text filter object with passed in value', () => {
  const text = 'foobar';

  expect(setTextFilter(text)).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('it creates a text filter object with an empty string when no value is passed', () => {
  expect(setTextFilter()).toEqual({ type: 'SET_TEXT_FILTER', text: '' });
});

test('it creates a sort by date filter object', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('it creates a sort by amount filter object', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('it creates a start date filter object with the passed in date', () => {
  const startDate = moment();

  expect(setStartDate(startDate)).toEqual({
    type: 'SET_START_DATE',
    startDate
  })
});

test('it creates an end date filter object with the passed in date', () => {
  const endDate = moment();

  expect(setEndDate(endDate)).toEqual({
    type: 'SET_END_DATE',
    endDate
  })
});
