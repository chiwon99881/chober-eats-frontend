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
  addOptionToItem?: (dishId: number, option: any) => void;
  optionSelected?: (dishId: number, optionName: string) => boolean;
  removeOptionFromItem?: (dishId: number, optionName: string) => void;
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
  addOptionToItem,
  optionSelected,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if (orderStarted && addItemToOrder && !isSelected) {
      addItemToOrder(id);
    }
    if (orderStarted && removeFromOrder && isSelected) {
      removeFromOrder(id);
    }
  };
  const onOptionClick = (dishId: number, optionName: string) => {
    if (
      orderStarted &&
      optionSelected &&
      optionSelected(dishId, optionName) &&
      removeOptionFromItem
    ) {
      return removeOptionFromItem(dishId, optionName);
    }
    if (
      orderStarted &&
      optionSelected &&
      !optionSelected(dishId, optionName) &&
      addOptionToItem
    ) {
      return addOptionToItem(dishId, { name: optionName });
    }
  };
  return (
    <div
      className={`border px-8 pt-10 pb-5 transition-all ${
        isSelected ? 'border-lime-600' : 'border-gray-300 hover:border-gray-600'
      }`}
    >
      <div className='mb-6 flex justify-between items-center'>
        <div>
          <span className='font-semibold text-lg mb-1 block'>{name}</span>
          <span className='font-medium text-sm block'>{description}</span>
        </div>
        {orderStarted && (
          <button
            onClick={onClick}
            className={`${
              isSelected
                ? 'btn'
                : 'py-3 px-5 text-lime-600 text-base rounded-lg border border-gray-300 focus:outline-none hover:text-lime-900 transition-colors'
            }`}
          >
            {isSelected ? '취소' : '선택'}
          </button>
        )}
      </div>
      <span>{price}원</span>
      {isCustomer && options && options.length !== 0 && (
        <div className='mt-5'>
          <span className='block font-semibold text-sm mb-2'>
            선택가능 옵션
          </span>
          {options.map((option, index) => (
            <div key={index} className='flex items-center mb-1'>
              <div
                onClick={() => onOptionClick(id, option.name)}
                className={`p-3 border border-gray-300 mr-3 cursor-pointer ${
                  optionSelected && optionSelected(id, option.name)
                    ? 'bg-lime-600'
                    : ''
                }`}
              ></div>
              <h5 className='mr-3 text-sm '>{option.name}</h5>
              <h5 className='mr-3 text-sm opacity-75'>{option.extra}원</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
