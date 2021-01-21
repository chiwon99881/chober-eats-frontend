import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
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
  file: FileList;
}

export const AddRestaurants = () => {
  const onCompleted = (data: createRestaurantMutation) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok || error) {
      setUploading(false);
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, { onCompleted });
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
  } = useForm<IFormProps>({ mode: 'onChange' });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, address, categoryName, file } = getValues();
      const uploadFile = file[0];
      const formBody = new FormData();
      formBody.append('file', uploadFile);
      const { url: coverImage } = await (
        await fetch('http://localhost:4000/uploads', {
          method: 'POST',
          body: formBody,
        })
      ).json();
      createRestaurantMutation({
        variables: {
          input: {
            name,
            address,
            categoryName,
            coverImage,
          },
        },
      });
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };
  return (
    <div className='container'>
      <Helmet>
        <title>Add Restaurants | Chober-Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-3 mt-12 w-full p-5'
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
        <div>
          <input
            type='file'
            name='file'
            accept='image/*'
            ref={register({ required: true })}
          />
        </div>
        <Button
          actionText={'추가하기'}
          canClick={formState.isValid}
          loading={uploading}
        />
        {data?.createRestaurant.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
