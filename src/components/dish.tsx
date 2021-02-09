import React from 'react';
import { getRestaurantQuery_getRestaurant_restaurant_menu_options } from '../__generated__/getRestaurantQuery';

interface IDishProps {
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: getRestaurantQuery_getRestaurant_restaurant_menu_options[] | null;
}

export const Dish: React.FC<IDishProps> = ({
  name,
  description,
  price,
  isCustomer = false,
  options,
}) => {
  return (
    <div className='border border-gray-300 px-8 pt-10 pb-5 hover:border-gray-600 transition-all'>
      <div className='mb-6'>
        <span className='font-semibold text-lg mb-1 block'>{name}</span>
        <span className='font-medium text-sm block'>{description}</span>
      </div>
      <span>{price}원</span>
      {isCustomer && options && options.length !== 0 && (
        <div className='mt-5'>
          <span className='block font-semibold text-sm mb-2'>
            선택가능 옵션
          </span>
          {options.map((option, index) => (
            <div className='flex items-center'>
              <h5 className='mr-3 text-sm '>{option.name}</h5>
              <h5 className='mr-3 text-sm opacity-75'>{option.extra}원</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
