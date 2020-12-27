import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import uberlogo from '../images/logo.svg';
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
    <div className='h-screen flex flex-col items-center mt-10 lg:mt-20'>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
        <img src={uberlogo} alt='logo' className='w-52' />
        <div className='flex flex-col w-full pt-16'>
          <span className='font-medium text-3xl'>돌아오신 것을 환영합니다</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 mt-12 w-full'
        >
          <span>이메일 주소로 로그인 하세요.</span>
          <input
            ref={register({ required: 'Email is required.' })}
            className='input'
            name='email'
            type='email'
            placeholder='이메일'
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
            placeholder='비밀번호'
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <button className='btn'>
            {loading ? '로딩중 입니다...' : '로그인'}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
