import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  createDishMutation,
  createDishMutationVariables,
} from '../../__generated__/createDishMutation';

const CREATE_DISH_MUTATION = gql`
  mutation createDishMutation($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const [createDishMutation, { loading, error, data }] = useMutation<
    createDishMutation,
    createDishMutationVariables
  >(CREATE_DISH_MUTATION);
  return <h1>Add Dish</h1>;
};
