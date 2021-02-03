import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import {
  createDishMutation,
  createDishMutationVariables,
} from '../../__generated__/createDishMutation';
import { MY_RESTAURANT_QUERY } from './my-restaurant';

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

interface IFormProps {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
  } = useForm<IFormProps>({
    mode: 'onChange',
  });
  const [createDishMutation, { loading, data }] = useMutation<
    createDishMutation,
    createDishMutationVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: { input: { id: +restaurantId } },
      },
    ],
  });
  const onSubmit = () => {
    const { name, description, price } = getValues();
    createDishMutation({
      variables: {
        input: {
          restaurantId: +restaurantId,
          name,
          price: +price,
          description,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className='w-full max-w-7xl flex flex-col items-center mx-auto my-36'>
      <Helmet>
        <title>Add Dish | Chober-Eats</title>
      </Helmet>
      <span className='text-3xl font-semibold'>음식 추가하기</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-3 mt-3 w-full p-5'
      >
        <input
          ref={register({ required: '음식 이름은 필수항목 입니다.' })}
          type='text'
          className='input'
          placeholder='음식 이름'
          name='name'
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
        )}
        <input
          ref={register({ required: '음식 가격은 필수항목 입니다.' })}
          type='number'
          className='input'
          placeholder='음식 가격'
          name='price'
          min={0}
        />
        {errors.price?.message && (
          <FormError errorMessage={errors.price.message} />
        )}
        <input
          ref={register({
            required: '음식 상세설명은 필수항목 입니다.(5자 이상)',
            minLength: 5,
          })}
          type='text'
          className='input'
          placeholder='음식 상세설명 (5자 이상)'
          name='description'
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description.message} />
        )}
        <Button
          actionText={'음식 추가하기'}
          canClick={formState.isValid}
          loading={loading}
        />
        {data?.createDish.error && (
          <FormError errorMessage={data.createDish.error} />
        )}
      </form>
    </div>
  );
};
