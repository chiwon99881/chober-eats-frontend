import { gql, useLazyQuery } from '@apollo/client';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Restaurant } from '../../components/restaurant';
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
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();
  const [queryReadyToStart, { loading, data }] = useLazyQuery<
    searchRestaurants,
    searchRestaurantsVariables
  >(SEARCH_RESTAURANT);
  // eslint-disable-next-line
  const [_, searchTerm] = location.search.split('?term=');
  useEffect(() => {
    if (!searchTerm) {
      //replace 는 history에 안남고 push는 history에 남는다.
      history.replace('/');
    }
    queryReadyToStart({
      variables: {
        input: {
          page,
          query: searchTerm,
        },
      },
    });
    console.log(data, loading);
  }, [history, location, data, loading, queryReadyToStart, page, searchTerm]);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const onNextPageClick = () => setPage((current) => current + 1);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Helmet>
          <title>Search | Chober-Eats</title>
        </Helmet>
        <SearchForm />
        <div className='max-w-screen-xl mx-auto px-24 py-10'>
          <span className='block text-5xl font-semibold text-black capitalize mb-10'>
            {`'${searchTerm}' Results:`}
          </span>
          <div className='border-t border-gray-300'></div>
          <span className='block my-10 text-4xl font-semibold text-black'>
            {`${data?.searchRestaurants.totalItems} Restaurants`}
          </span>
          <div className='grid lg:grid-cols-3 gap-x-5 gap-y-10 mb-24'>
            {data?.searchRestaurants?.restaurants?.map((restaurant, index) => (
              <Restaurant
                key={index}
                id={restaurant.id}
                categoryName={restaurant.category?.name}
                coverImg={restaurant.coverImage}
                restaurantName={restaurant.name}
              />
            ))}
          </div>
          <div className='flex justify-center items-center'>
            {page > 1 && (
              <FontAwesomeIcon
                icon={faAngleLeft}
                className='font-bold text-3xl cursor-pointer'
                onClick={onPrevPageClick}
              />
            )}
            <span className='mx-3'>
              Page {page} of {data?.searchRestaurants.totalPages}
            </span>
            {page !== data?.searchRestaurants.totalPages && (
              <FontAwesomeIcon
                icon={faAngleRight}
                className='font-bold text-3xl cursor-pointer'
                onClick={onNextPageClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
