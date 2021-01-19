import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import uberlogo from '../images/logo.svg';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../__generated__/createAccountMutation';
import { UserRole } from '../__generated__/globalTypes';

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: { role: UserRole.Client },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert('계정 생성이 완료되었습니다! 로그인 하세요.');
      history.push('/');
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted },
  );
  const onSubmit = () => {
    const { email, password, role } = getValues();
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <div className='h-screen flex flex-col items-center mt-10 lg:mt-20'>
      <Helmet>
        <title>SignUp | Chober-Eats</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
        <img src={uberlogo} alt='logo' className='w-52' />
        <div className='flex flex-col w-full pt-16'>
          <span className='font-medium text-3xl'>시작하기</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid gap-3 mt-12 w-full'
        >
          <span>아래 내용을 입력해 주세요.</span>
          <input
            ref={register({
              required: '이메일은 필수항목 입니다.',
              // eslint-disable-next-line
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            className='input'
            name='email'
            type='email'
            placeholder='이메일'
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'이메일 형식이 올바르지 않습니다.'} />
          )}
          <input
            ref={register({ required: '패스워드는 필수항목 입니다.' })}
            className='input'
            name='password'
            type='password'
            placeholder='비밀번호'
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <select
            ref={register({ required: true })}
            name='role'
            className='input'
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={'회원 가입'}
          />
          <div className='flex w-full justify-center'>
            {createAccountMutationResult?.createAccount.error && (
              <FormError
                errorMessage={createAccountMutationResult.createAccount.error}
              />
            )}
          </div>
        </form>
        <div className='mt-3'>
          이미 계정이 있으신가요?{' '}
          <Link to='/' className='text-lime-700 font-medium'>
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
};
