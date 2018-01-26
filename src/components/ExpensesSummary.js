import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const countExpression = (count) => {
  if (count === 0) return 'no expenses';
  if (count === 1) return '1 expense';
  return `${count} expenses`;
};

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1>Viewing {countExpression(expenseCount)} totaling {numeral(expensesTotal / 100).format('$0,0.00')}</h1>
        <Link to='/create' className='button button-link'>Add Expense</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);
