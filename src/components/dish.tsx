import React from 'react';

interface IDishProps {
  description: string;
  name: string;
  price: number;
}

export const Dish: React.FC<IDishProps> = ({ name, description, price }) => {
  return (
    <div className='border border-gray-300 px-8 pt-10 pb-5 hover:border-gray-600 transition-all'>
      <div className='mb-6'>
        <span className='font-semibold text-lg mb-1 block'>{name}</span>
        <span className='font-medium text-sm block'>{description}</span>
      </div>
      <span>{price}원</span>
    </div>
  );
};
