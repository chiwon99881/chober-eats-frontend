import { gql, useMutation } from '@apollo/client';
import React from 'react';
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import uberlogo from '../images/logo.svg';
import { UserRole } from '../__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
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
    watch,
    handleSubmit,
    errors,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: { role: UserRole.Client },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);
  const onSubmit = () => {};
  console.log(watch());
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
            loading={false}
            actionText={'회원 가입'}
          />
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
