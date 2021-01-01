import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className='h-screen flex flex-col items-center justify-center'>
    <Helmet>
      <title>Not Found | Chober-Eats</title>
    </Helmet>
    <h2 className='text-4xl font-bold tracking-wider'>Page Not Found</h2>
    <h4 className='mt-4 text-lg'>
      The page you're looking for does not exist or has moved.
    </h4>
    <Link to='/' className='text-lg hover:underline text-lime-600'>
      Go back home &rarr;
    </Link>
  </div>
);
