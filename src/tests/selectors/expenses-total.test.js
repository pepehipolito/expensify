import selectExpensesTotal from '../../selectors/expenses-total.js'
import expenses from '../fixtures/expenses';

// Amounts from expenses fixtures:
//    @ 0:    195
//    @ 1: 109500
//    @ 2:   4500
//  Total: 114195
test('returns 0 when no expenses', () => {
  expect(selectExpensesTotal([])).toBe(0);
});

test('returns correct amount for one expense', () => {
  expect(selectExpensesTotal([expenses[0]])).toBe(195);
  expect(selectExpensesTotal([expenses[1]])).toBe(109500);
  expect(selectExpensesTotal([expenses[2]])).toBe(4500);
});

test('returns correct amount for multiple expenses', () => {
  expect(selectExpensesTotal(expenses)).toBe(114195);
});
