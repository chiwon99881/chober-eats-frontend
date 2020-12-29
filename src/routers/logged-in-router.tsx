import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';
import { NotFound } from '../pages/404';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { Loading } from '../components/loading';

const ClientRoutes = [
  <Route path='/' key='restaurants' exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return <Loading />;
  } else {
    return (
      <Router>
        <Header />
        <Switch>
          {data.me.role === UserRole.Client && ClientRoutes}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
};
