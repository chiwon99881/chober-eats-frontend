import React from 'react';
import { Loader } from './loading';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  // eslint-disable-next-line
  <button
    role='button'
    className={`${
      canClick
        ? 'bg-lime-600 hover:bg-lime-700'
        : 'bg-gray-300 pointer-events-none'
    } 
    py-3 px-5 mt-3 text-white text-base rounded-lg focus:outline-none transition-colors`}
  >
    {loading ? <Loader /> : actionText}
  </button>
);
