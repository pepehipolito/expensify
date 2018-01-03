import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocus: null
  };

  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocus) => {
    this.setState(() => ({calendarFocus}));
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortByChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />

        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortByChange}
        >
          <option value='date'>Date</option>
          <option value='amount'>Amount</option>
        </select>

        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocus}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({filters: state.filters});
const mapDispatchToProps = (dispatch, props) => ({
  setStartDate:   (date)  => dispatch(setStartDate(date)),
  setEndDate:     (date)  => dispatch(setEndDate(date)),
  setTextFilter:  (text)  => dispatch(setTextFilter(text)),
  sortByDate:     ()      => dispatch(sortByDate()),
  sortByAmount:   ()      => dispatch(sortByAmount())
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
