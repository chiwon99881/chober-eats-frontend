import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';
import { NotFound } from '../pages/404';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { Loading } from '../components/loading';
import { VerifyEmail } from '../pages/user/verify-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { Restaurants } from '../pages/client/restaurants';
import { MyRestaurants } from '../pages/owner/my-restaurants';
import { AddRestaurants } from '../pages/owner/add-restaurants';
import { MyRestaurant } from '../pages/owner/my-restaurant';
import { AddDish } from '../pages/owner/add-dish';
import { Order } from '../pages/order';

const clientRoutes = [
  {
    path: '/',
    component: <Restaurants />,
  },
  {
    path: 'search',
    component: <Search />,
  },
  {
    path: '/category/:slug',
    component: <Category />,
  },
  {
    path: '/restaurant/:id',
    component: <Restaurant />,
  },
];

const ownerRoutes = [
  { path: '/', component: <MyRestaurants /> },
  { path: '/add-restaurants', component: <AddRestaurants /> },
  { path: '/restaurant/:id', component: <MyRestaurant /> },
  { path: '/restaurant/:id/add-dish', component: <AddDish /> },
];

const commonRoutes = [
  { path: '/verify-email', component: <VerifyEmail /> },
  { path: '/edit-profile', component: <EditProfile /> },
  { path: '/orders/:id', component: <Order /> },
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
          {data.me.role === UserRole.Client &&
            clientRoutes.map((route) => {
              return (
                <Route key={route.path} path={route.path} exact>
                  {route.component}
                </Route>
              );
            })}
          {data.me.role === UserRole.Owner &&
            ownerRoutes.map((route) => {
              return (
                <Route key={route.path} path={route.path} exact>
                  {route.component}
                </Route>
              );
            })}
          {commonRoutes.map((route) => {
            return (
              <Route key={route.path} path={route.path} exact>
                {route.component}
              </Route>
            );
          })}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
};
