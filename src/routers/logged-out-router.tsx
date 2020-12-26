import React from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log(`can't create account.`);
  };
  console.log(errors);
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: true,
              pattern: /^[a-z0-9._%+-]+@gmail.com$/,
            })}
            name='email'
            type='email'
            placeholder='email'
          />
        </div>
        <div>
          <input
            ref={register}
            name='password'
            type='password'
            placeholder='password'
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
