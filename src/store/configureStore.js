import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
}                             from 'redux';
import thunk                  from 'redux-thunk';
import expensesReducer        from '../reducers/expenses';
import filtersReducer         from '../reducers/filters';
import authReducer            from '../reducers/auth';
import spanishLeagueReducer   from '../reducers/spanishLeague';
import bulgarianLeagueReducer from '../reducers/bulgarianLeague';

const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer,
      leagues: combineReducers({
        spanish: spanishLeagueReducer,
        bulgarian: bulgarianLeagueReducer
      })
    }),
    composeEnhancers(applyMiddleware(thunk)) // 'thunk' forces us to use this, otherwise we'd use the line below.
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
