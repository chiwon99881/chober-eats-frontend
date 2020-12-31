import React from 'react';
import { Button } from '../../components/button';
import { useMe } from '../../hooks/useMe';

export const EditProfile = () => {
  const { data: meData } = useMe();

  return (
    <div className='mt-28 flex flex-col justify-center items-center'>
      <h4 className='font-semibold text-2xl mb-6'>프로필 수정</h4>
      <form className='grid gap-3 max-w-screen-md w-full mx-auto border border-gray-300 p-10 rounded-md'>
        <input className='input' type='email' placeholder='Email' />
        <input className='input' type='password' placeholder='Password' />
        <Button loading={false} actionText={'프로필 저장'} canClick={true} />
      </form>
    </div>
  );
};
