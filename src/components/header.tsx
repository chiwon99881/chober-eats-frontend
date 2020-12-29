import React from 'react';
import uberlogo from '../images/logo.svg';

export const Header = () => (
  <header className='bg-red-500 py-4'>
    <div className='w-full max-w-screen-xl bg-yellow-500 mx-auto'>
      <img src={uberlogo} />
    </div>
  </header>
);
