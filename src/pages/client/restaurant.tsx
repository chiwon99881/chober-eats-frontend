import { gql, useQuery } from '@apollo/client';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  getRestaurantQuery,
  getRestaurantQueryVariables,
} from '../../__generated__/getRestaurantQuery';

const RESTAURANT_QUERY = gql`
  query getRestaurantQuery($input: RestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantFragment
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<
    getRestaurantQuery,
    getRestaurantQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  console.log(data, loading);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        className='w-full max-w-7xl py-52 bg-center bg-cover mx-auto'
        style={{
          backgroundImage: `url(${data?.getRestaurant.restaurant?.coverImage})`,
        }}
      >
        <div className='w-2/5 py-4 pl-16'>
          <span className='block text-5xl font-semibold text-white'>
            {data?.getRestaurant.restaurant?.name}
          </span>
          <div className='flex items-center mt-2'>
            <span className='text-xl font-medium text-white'>
              {data?.getRestaurant.restaurant?.category?.name}
            </span>
            <FontAwesomeIcon
              icon={faCircle}
              className='text-xs font-medium text-white mx-3'
            />
            <span className='text-xl font-medium text-white'>
              {data?.getRestaurant.restaurant?.address}
            </span>
          </div>
        </div>
      </div>
    );
  }
};
