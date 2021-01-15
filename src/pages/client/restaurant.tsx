import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
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
  return <h1>Restaurant</h1>;
};
