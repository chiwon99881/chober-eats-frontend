import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok) {
      console.log(token);
    } else {
      console.log(error);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div
        className='bg-white w-full max-w-lg py-10 rounded-lg text-center 
      border border-gray-300'
      >
        <span className='font-medium text-2xl text-black'>Chober-Eats</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 mt-5 px-5'
        >
          <input
            ref={register({ required: 'Email is required.' })}
            className='input'
            name='email'
            type='email'
            placeholder='Email'
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            ref={register({ required: 'Password is required.' })}
            className='input'
            name='password'
            type='password'
            placeholder='Password'
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <button className='mt-3 btn'>
            {loading ? 'Loading...' : 'Log In'}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
