import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { me } from '../__generated__/me';

const ME = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<me>(ME);
  if (!data || loading || error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wider'>
          잠시만 기다려 주세요...
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{data.me.role}</h1>
      </div>
    );
  }
};
