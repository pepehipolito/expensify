import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';

// We could have named this whatever we wanted. The file has a unique unnamed exported function.
import selectExpenses from '../selectors/expenses';

// We export this one to be able to test it. We test the unconnected version.
export const ExpenseList = (props) => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>Expenses</div>
      <div className='show-for-desktop'>Expense</div>
      <div className='show-for-desktop'>Amount</div>
    </div>
    <div className='list-body'>
      {
        props.expenses.length === 0 ? (
          <div className='list-item list-item__message'>
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
        )
      }
    </div>
  </div>
);

// This will map the state values and return an object that will be used as props for the regular
// component (ExpenseList). The function is implicitely returning the object.
const mapStateToProps = (state) => ({expenses: selectExpenses(state.expenses, state.filters)});

// connect() accepts a function (mapStateToProps here) that returns an object that will be used as
// props to the regular component we are connecting to (ExpenseList here).
// When a component is connected to the redux store it becomes "reactive", it gets re-rendered when
// the store changes. connect() makes the component a subscriber/listener to changes in the store.
// Since we are returning above the entire contents of state we could have rewritten the following
// line as: export default connect((state) => state)(ExpenseList);
export default connect(mapStateToProps)(ExpenseList);
