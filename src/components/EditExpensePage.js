import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm
          action='Update'
          onSubmit={this.onSubmit}
          onRemove={this.onRemove}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense:        (expenseId, expense) => dispatch(editExpense(expenseId, expense)),
  startRemoveExpense: expenseId => dispatch(startRemoveExpense(expenseId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
