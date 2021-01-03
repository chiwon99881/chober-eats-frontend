import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';
import { NotFound } from '../pages/404';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { Loading } from '../components/loading';
import { VerifyEmail } from '../pages/user/verify-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';

const ClientRoutes = [
  <Route path='/' key='restaurants' exact>
    <Restaurants />
  </Route>,
  <Route path='/verify-email' key='verify-email' exact>
    <VerifyEmail />
  </Route>,
  <Route path='/edit-profile' key='edit-profile' exact>
    <EditProfile />
  </Route>,
  <Route path='/search' key='search' exact>
    <Search />
  </Route>,
  <Route path='/category/:slug' key='category' exact>
    <Category />
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
