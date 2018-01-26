import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Edit Expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            action='Update'
            onSubmit={this.onSubmit}
            onRemove={this.onRemove}
            expense={this.props.expense}
          />
        <button className='button button__secondary' onClick={this.onRemove}>Remove Expense</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense:   (expenseId, expense) => dispatch(startEditExpense(expenseId, expense)),
  startRemoveExpense: expenseId => dispatch(startRemoveExpense(expenseId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
