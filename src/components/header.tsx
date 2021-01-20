import { useReactiveVar } from '@apollo/client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { isVerifyPage } from '../apollo';
import { useMe } from '../hooks/useMe';
import uberlogo from '../images/logo.svg';

export const Header: React.FC = () => {
  const { data } = useMe();
  const isVerifyPageValue = useReactiveVar(isVerifyPage);
  return (
    <>
      {isVerifyPageValue === false ? (
        data?.me.verified === false ? (
          <div
            // eslint-disable-next-line
            role='verify-popup'
            className='bg-gray-400 py-5 px-3 flex flex-col items-center bg-opacity-70'
          >
            <span className='font-medium text-sm text-white'>
              회원님, 이메일 인증을 해주세요.
            </span>
            <span className='font-semibold text-white'>
              <Link to='/verify-email' onClick={() => isVerifyPage(true)}>
                이메일 인증하러 가기 &rarr;
              </Link>
            </span>
          </div>
        ) : (
          ''
        )
      ) : (
        ''
      )}
      <header className='py-4 border border-gray-300'>
        <div className='w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center '>
          <Link to='/'>
            <img src={uberlogo} alt='logo' />
          </Link>
          <span className='text-base'>
            <Link to='/edit-profile'>
              <FontAwesomeIcon icon={faUser} className='text-2xl' />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
