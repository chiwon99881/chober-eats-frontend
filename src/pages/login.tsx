import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, handleSubmit, errors } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
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
            <span className='font-medium text-red-400'>
              {errors.email.message}
            </span>
          )}
          {}
          <input
            ref={register({ required: 'Password is required.', minLength: 5 })}
            className='input'
            name='password'
            type='password'
            placeholder='Password'
            required
          />
          {errors.password?.type === 'minLength' && (
            <span className='font-medium text-red-400'>
              Password must be more 5 length.
            </span>
          )}
          {errors.password?.message && (
            <span className='font-medium text-red-400'>
              {errors.password.message}
            </span>
          )}
          <button className='mt-3 btn'>Log in</button>
        </form>
      </div>
    </div>
  );
};
