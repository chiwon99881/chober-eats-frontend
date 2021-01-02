import { gql, useQuery } from '@apollo/client';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Restaurant } from '../../components/restaurant';
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
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalItems
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
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
      <form
        className='w-full py-40 flex flex-col items-center justify-center bg-cover bg-center'
        style={{
          backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/37d1c792897985.5e584e035a037.png)`,
        }}
      >
        <span className='w-3/6 text-left mb-6 text-4xl text-black font-semibold'>
          Hungry? You're in the right place
        </span>
        <input
          type='Search'
          placeholder='🍙 Enter Food'
          className='input w-3/6 border-0'
        />
      </form>
      {!loading && (
        <div className='max-w-screen-xl mx-auto mt-8 pb-24'>
          <div className='flex justify-around max-w-xl'>
            {data?.allCategories.categories?.map((category, index) => (
              <div
                key={index}
                className='flex flex-col items-center justify-center cursor-pointer'
              >
                <div
                  className='bg-cover circle-lg bg-center'
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className='font-medium mt-3'>{category.name}</span>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-3 gap-x-5 gap-y-10 mt-16'>
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
