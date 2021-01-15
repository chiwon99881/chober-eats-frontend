import React from 'react';
import { Link } from 'react-router-dom';

interface IRestaurantProps {
  id: number;
  coverImg: string;
  restaurantName: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  restaurantName,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className='flex flex-col'>
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className='bg-center bg-cover py-32 mb-3'
        ></div>
        <h3 className='font-medium text-lg'>{restaurantName}</h3>
        <span className='border-t border-gray-400 mt-2 pt-1 text-xs opacity-70'>
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
