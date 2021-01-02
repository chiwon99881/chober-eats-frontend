import { gql, useQuery } from '@apollo/client';
import React from 'react';
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
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);

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
      {!loading && data?.allCategories.categories && (
        <div className='max-w-screen-xl mx-auto mt-8'>
          <div className='flex justify-around max-w-xl'>
            {data?.allCategories.categories.map((category) => (
              <div className='flex flex-col items-center justify-center cursor-pointer'>
                <div
                  className='bg-cover circle-lg bg-center'
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className='font-medium mt-3'>{category.name}</span>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-3 gap-x-5 gap-y-10 mt-10'>
            {data.allRestaurants.results?.map((restaurant) => (
              <div className='w-full'>
                <div
                  style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                  className='bg-center bg-cover py-32 mb-3'
                ></div>
                <h3 className='font-medium text-lg'>{restaurant.name}</h3>
                <span className='block border-t border-gray-200 w-full mt-2 pt-1'>
                  {restaurant.category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
