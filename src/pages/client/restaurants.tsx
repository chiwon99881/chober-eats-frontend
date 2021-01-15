import { gql, useQuery } from '@apollo/client';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { SearchForm } from '../../components/search-form';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryFragment
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalItems
      results {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <Helmet>
        <title>Home | Chober-Eats</title>
      </Helmet>
      <SearchForm />
      {!loading && (
        <div className='max-w-screen-xl mx-auto p-16'>
          <div className='flex justify-around max-w-xl'>
            {data?.allCategories.categories?.map((category, index) => (
              <Link to={`/category/${category.slug}`} key={index}>
                <div className='flex flex-col items-center justify-center cursor-pointer'>
                  <div
                    className='bg-cover circle-lg bg-center'
                    style={{ backgroundImage: `url(${category.coverImage})` }}
                  ></div>
                  <span className='font-medium mt-3'>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className='grid lg:grid-cols-3 gap-x-5 gap-y-10 mt-16'>
            {data?.allRestaurants.results?.map((restaurant, index) => (
              <Restaurant
                key={index}
                id={restaurant.id}
                categoryName={restaurant.category?.name}
                coverImg={restaurant.coverImage}
                restaurantName={restaurant.name}
              />
            ))}
          </div>
        </div>
      )}
      <div className='flex justify-center items-center '>
        {page > 1 && (
          <FontAwesomeIcon
            icon={faAngleLeft}
            className='font-bold text-3xl cursor-pointer'
            onClick={onPrevPageClick}
          />
        )}
        <span className='mx-3'>
          Page {page} of {data?.allRestaurants.totalPages}
        </span>
        {page !== data?.allRestaurants.totalPages && (
          <FontAwesomeIcon
            icon={faAngleRight}
            className='font-bold text-3xl cursor-pointer'
            onClick={onNextPageClick}
          />
        )}
      </div>
    </div>
  );
};
