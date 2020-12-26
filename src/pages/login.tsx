import React from 'react';

export const Login = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div
        className='bg-white w-full max-w-lg py-10 rounded-lg text-center 
      border border-gray-300'
      >
        <span className='font-medium text-2xl text-black'>Chober-Eats</span>
        <form className='flex flex-col mt-5 px-5'>
          <input
            className='bg-white shadow-inner 
            focus:outline-none border focus:border-opacity-50 
            focus:border-blue-500 mb-3 py-3 px-2 rounded-lg'
            placeholder='Email'
          />
          <input
            className='bg-white shadow-inner 
            focus:outline-none border focus:border-opacity-50 
            focus:border-blue-500 py-3 px-2 rounded-lg'
            placeholder='Password'
          />
          <button
            className='py-3 px-5 bg-blue-400 text-white
          text-base mt-3 rounded-lg focus:outline-none hover:opacity-80'
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
