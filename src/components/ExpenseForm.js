import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    const { expense } = this.props;

    this.state = {
      description:      expense ? expense.description : '',
      note:             expense ? expense.note : '',
      amount:           expense ? (expense.amount / 100).toString() : '',
      createdAt:        expense ? moment(expense.createdAt) : moment(),
      calendarFocused:  false,
      error:            ''
    };
  }

  onDescriptionChange = (e) => {
    // We could have done something like this, but it would have given us errors because the target
    // doesn't exist at definition time:
    //  this.setState(() => ({description: e.target.value}))
    // In order to avoid the error and make it work we would need to persist the event first:
    //  e.persist();
    //  this.setState(() => ({description: e.target.value}))
    // But it's just easier this way:
    const description = e.target.value;
    this.setState(() => ({description}))
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/) ) {
      this.setState(() => ({amount}));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}))
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.description && this.state.amount) {
      this.setState(() => ({error: ''}));
      // amount: we need to parse it as a float because it is stored in the state in string format
      // and we need to mulitply it by 100 to convert it to cents.
      // createdAt: we need to convert it to a millisecond based timestamp with moment's 'valueOf'
      // method because it is a 'moment' instance.
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    } else {
      this.setState(() => ({error: 'Please provide description and amount.'}));
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <h3>{this.state.error}</h3>}

        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            placeholder='Description'
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />

          <input
            type='text'
            placeholder='Amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
          />

          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={(day) => false}
          />

          <textarea
            placeholder='Add a note for your expense (optional)'
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>{this.props.action} Expense</button>
        </form>
        {this.props.action === 'Update' && <button onClick={this.props.onRemove}>Remove</button>}
      </div>
    );
  }
}
