import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import AddExpensePage       from '../components/AddExpensePage';
import EditExpensePage      from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage             from '../components/HelpPage';
import LoginPage            from '../components/LoginPage';
import NotFoundPage         from '../components/NotFoundPage';
import PrivateRoute         from './PrivateRoute';

export const history = createHistory();

// exact must be used for the dashboard because the route matches every other route and would always
// show otherwise.
// Switch was initially a <div> because BrowserRouter needs a unique child inside of it. However we
// are changing to Switch because it makes the router stop whenever it finds a match, that way the
// NotFoundPage will not display when another page is displayed.
export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' component={LoginPage} exact={true}/>
      <PrivateRoute path='/dashboard' component={ExpenseDashboardPage}/>
      <PrivateRoute path='/create' component={AddExpensePage} />
      <PrivateRoute path='/edit/:id' component={EditExpensePage} />
      <Route path='/help' component={HelpPage} />
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);

export default AppRouter;
