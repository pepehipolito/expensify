import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import AddExpensePage       from '../components/AddExpensePage';
import EditExpensePage      from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header               from '../components/Header';
import HelpPage             from '../components/HelpPage';
import NotFoundPage         from '../components/NotFoundPage';

// exact must be used for the dashboard because the route matches every other route and would always
// show otherwise.
// Switch was initially a <div> because BrowserRouter needs a unique child inside of it. However we
// are changing to Switch because it makes the router stop whenever it finds a match, that way the
// NotFoundPage will not display when another page is displayed.
export const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={ExpenseDashboardPage} exact={true}/>
        <Route path='/create' component={AddExpensePage} />
        <Route path='/edit/:id' component={EditExpensePage} />
        <Route path='/help' component={HelpPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
