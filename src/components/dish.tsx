import React from 'react';
import { getRestaurantQuery_getRestaurant_restaurant_menu_options } from '../__generated__/getRestaurantQuery';

interface IDishProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  isSelected?: boolean;
  orderStarted?: boolean;
  options?: getRestaurantQuery_getRestaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  description,
  price,
  isCustomer = false,
  orderStarted = false,
  isSelected,
  options,
  addItemToOrder,
  removeFromOrder,
}) => {
  const onClick = () => {
    if (orderStarted && addItemToOrder && !isSelected) {
      addItemToOrder(id);
    }
    if (orderStarted && removeFromOrder && isSelected) {
      removeFromOrder(id);
    }
  };
  return (
    <div
      onClick={onClick}
      className={`border px-8 pt-10 pb-5 transition-all ${
        isSelected ? 'border-red-400' : 'border-gray-300 hover:border-gray-600'
      }`}
    >
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
            <div key={index} className='flex items-center'>
              <h5 className='mr-3 text-sm '>{option.name}</h5>
              <h5 className='mr-3 text-sm opacity-75'>{option.extra}원</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
