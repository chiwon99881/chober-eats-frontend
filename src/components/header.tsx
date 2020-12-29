import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import uberlogo from '../images/logo.svg';

export const Header: React.FC = () => {
  //const { data, loading, error } = useMe();
  return (
    <header className='py-4'>
      <div className='w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center'>
        <img src={uberlogo} alt='logo' />
        <span className='text-base'>
          <Link to='/my-profile'>
            <FontAwesomeIcon icon={faUser} className='text-2xl' />
          </Link>
        </span>
      </div>
    </header>
  );
};
