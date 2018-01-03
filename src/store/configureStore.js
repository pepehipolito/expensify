import { createStore, combineReducers } from 'redux';
import expensesReducer                  from '../reducers/expenses';
import filtersReducer                   from '../reducers/filters';
import spanishLeagueReducer             from '../reducers/spanishLeague';
import bulgarianLeagueReducer           from '../reducers/bulgarianLeague';

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      leagues: combineReducers({
        spanish: spanishLeagueReducer,
        bulgarian: bulgarianLeagueReducer
      })
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
