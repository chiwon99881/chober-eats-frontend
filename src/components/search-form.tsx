import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

interface IFormProps {
  searchTerm: string;
}

export const SearchForm = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSearchSubmit)}
      className='w-full py-40 flex flex-col items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/37d1c792897985.5e584e035a037.png)`,
      }}
    >
      <span className='w-3/6 text-left mb-6 text-4xl text-black font-semibold'>
        Hungry? You're in the right place
      </span>
      <input
        ref={register({ required: true, min: 2 })}
        name='searchTerm'
        type='Search'
        placeholder='🍙 Enter Food'
        className='input w-3/6 border-0'
      />
    </form>
  );
};
