import reduceFilters from '../../reducers/filters';
import moment from 'moment';

test('sets up default filter values', () => {
  const state = reduceFilters(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('does not change state with unknown action', () => {
  const initialState = {foo: 'bar'};
  const state = reduceFilters(initialState, {type: 'UNKNOWN'});
  expect(state).toEqual(initialState);
});

test('sets text state value', () => {
  const text = 'foobar';
  const state = reduceFilters({}, {type: 'SET_TEXT_FILTER', text});
  expect(state).toEqual({text});
});

test('sets sorting by date', () => {
  const sortBy = 'date';
  const state = reduceFilters({}, {type: 'SORT_BY_DATE', sortBy});
  expect(state).toEqual({sortBy});
});

test('sets sorting by amount', () => {
  const sortBy = 'amount';
  const state = reduceFilters({}, {type: 'SORT_BY_AMOUNT', sortBy});
  expect(state).toEqual({sortBy});
});

test('sets start date value', () => {
  const startDate = moment(12345);
  const state = reduceFilters({}, {type: 'SET_START_DATE', startDate});
  expect(state).toEqual({startDate});
});

test('sets end date value', () => {
  const endDate = moment(12345);
  const state = reduceFilters({}, {type: 'SET_END_DATE', endDate});
  expect(state).toEqual({endDate});
});
