import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  getOrderQuery,
  getOrderQueryVariables,
} from '../__generated__/getOrderQuery';

const GET_ORDER = gql`
  query getOrderQuery($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrderQuery, getOrderQueryVariables>(GET_ORDER, {
    variables: { input: { id: +params.id } },
  });
  console.log(data);
  return <h1>Order</h1>;
};
