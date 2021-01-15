import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { SearchForm } from '../../components/search-form';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  searchRestaurants,
  searchRestaurantsVariables,
} from '../../__generated__/searchRestaurants';

const SEARCH_RESTAURANT = gql`
  query searchRestaurants($input: SearchRestaurantInput!) {
    searchRestaurants(input: $input) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [queryReadyToStart, { loading, data }] = useLazyQuery<
    searchRestaurants,
    searchRestaurantsVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    // eslint-disable-next-line
    const [_, searchTerm] = location.search.split('?term=');
    if (!searchTerm) {
      //replace 는 history에 안남고 push는 history에 남는다.
      history.replace('/');
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
    console.log(data, loading);
  }, [history, location, data, loading, queryReadyToStart]);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Helmet>
          <title>Search | Chober-Eats</title>
        </Helmet>
        <SearchForm />
      </div>
    );
  }
};
