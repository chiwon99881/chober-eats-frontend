import { gql, useApolloClient, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { useMe } from '../../hooks/useMe';
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile';

interface IFormProps {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: meData, refetch } = useMe();
  const client = useApolloClient();
  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && meData) {
      // 1. writeFragment for cache update
      //   const {
      //     me: { email: prevEmail, id },
      //   } = meData;
      //   const { email: newEmail } = getValues();
      //   if (prevEmail !== newEmail) {
      //     client.writeFragment({
      //       id: `User:${id}`,
      //       fragment: gql`
      //         fragment EditProfile on User {
      //           email
      //           verified
      //         }
      //       `,
      //       data: {
      //         email: newEmail,
      //         verified: false,
      //       },
      //     });
      //   }

      // 2. refetch function for cache update.
      await refetch();
    }
  };
  const [editProfileMutation, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    defaultValues: {
      email: meData?.me.email,
    },
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfileMutation({
      variables: {
        input: {
          ...(email !== '' && { email }),
          ...(password !== '' && { password }),
        },
      },
    });
  };

  return (
    <div className='mt-28 flex flex-col justify-center items-center'>
      <h4 className='font-semibold text-2xl mb-6'>프로필 수정</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-3 max-w-screen-md w-full mx-auto border border-gray-300 p-10 rounded-md'
      >
        <input
          ref={register({
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className='input'
          name='email'
          type='email'
          placeholder='Email'
        />
        <input
          ref={register}
          className='input'
          name='password'
          type='password'
          placeholder='Password'
        />
        <Button
          loading={loading}
          actionText={'프로필 저장'}
          canClick={formState.isValid}
        />
      </form>
    </div>
  );
};
