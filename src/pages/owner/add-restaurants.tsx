import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from '../../__generated__/createRestaurantMutation';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurants = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
  } = useForm<IFormProps>({ mode: 'onChange' });
  const onSubmit = () => {
    const { name, address, categoryName } = getValues();
  };
  return (
    <div className='container'>
      <Helmet>
        <title>Add Restaurants | Chober-Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-3 mt-12 border border-gray-300 w-full p-5 rounded'
      >
        <input
          ref={register({ required: '레스토랑 이름은 필수항목 입니다.' })}
          type='text'
          className='input'
          placeholder='레스토랑 이름'
          name='name'
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
        )}
        <input
          ref={register({ required: '레스토랑 주소는 필수항목 입니다.' })}
          type='text'
          className='input'
          placeholder='레스토랑 주소'
          name='address'
        />
        {errors.address?.message && (
          <FormError errorMessage={errors.address.message} />
        )}
        <input
          ref={register({ required: '카테고리 이름은 필수항목 입니다.' })}
          type='text'
          className='input'
          placeholder='카테고리'
          name='categoryName'
        />
        {errors.categoryName?.message && (
          <FormError errorMessage={errors.categoryName.message} />
        )}
        <Button
          actionText={'추가하기'}
          canClick={formState.isValid}
          loading={loading}
        />
      </form>
    </div>
  );
};
