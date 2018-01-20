import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//FIXME: The id value is always NaN, so data does not show and record cannot be removed.
const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => (
  <div>
    <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
      <p>
        {numeral(amount / 100).format('$,0.00')}
        -
        {moment(createdAt).format('MMMM Do, YYYY')}
      </p>
  </div>
);

export default ExpenseListItem;
