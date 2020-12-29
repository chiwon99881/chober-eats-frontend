import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { me } from '../__generated__/me';
import { UserRole } from '../__generated__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';
import { NotFound } from '../pages/404';
import { Header } from '../components/header';

const ClientRoutes = [
  <Route path='/' key='restaurants' exact>
    <Restaurants />
  </Route>,
];

const ME = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<me>(ME);
  if (!data || loading || error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wider'>
          잠시만 기다려 주세요...
        </span>
      </div>
    );
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
